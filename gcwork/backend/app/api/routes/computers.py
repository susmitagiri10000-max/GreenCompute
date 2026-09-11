from datetime import datetime, timedelta

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.api.dependencies import get_current_user
from app.core.database import get_db
from app.models.carbon_log import CarbonLog
from app.models.computer import Computer
from app.models.energy_log import EnergyLog
from app.models.lab import Lab
from app.schemas.computer import (
    AgentRegisterRequest,
    ComputerCreate,
    ComputerResponse,
    TelemetryRequest,
)

router = APIRouter(prefix="/computers", tags=["Computers"])

import os

CARBON_INTENSITY_G_PER_KWH = float(os.getenv("GRID_CARBON_INTENSITY_G_PER_KWH", "700"))
OFFLINE_AFTER_SECONDS = 90


def _refresh_stale_statuses(db: Session) -> None:
    cutoff = datetime.utcnow() - timedelta(seconds=OFFLINE_AFTER_SECONDS)
    db.query(Computer).filter(
        Computer.is_active == True,
        Computer.last_seen_at.is_not(None),
        Computer.last_seen_at < cutoff,
        Computer.status != "offline",
    ).update({Computer.status: "offline"}, synchronize_session=False)
    db.commit()


@router.post("/register-agent", response_model=ComputerResponse)
def register_agent(
    data: AgentRegisterRequest,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user),
):
    lab = db.query(Lab).filter(Lab.id == data.lab_id, Lab.is_active == True).first()
    if not lab:
        raise HTTPException(status_code=404, detail="Lab not found")

    computer = db.query(Computer).filter(Computer.hostname == data.hostname).first()
    if computer:
        if not computer.is_active:
            computer.is_active = True
        computer.lab_id = data.lab_id
        computer.name = data.name or computer.name
        computer.ip_address = data.ip_address or computer.ip_address
    else:
        computer = Computer(
            name=data.name or data.hostname,
            hostname=data.hostname,
            lab_id=data.lab_id,
            ip_address=data.ip_address,
            status="online",
            last_seen_at=datetime.utcnow(),
        )
        db.add(computer)

    db.commit()
    db.refresh(computer)
    return computer


@router.post("/{computer_id}/telemetry", response_model=ComputerResponse)
def receive_telemetry(
    computer_id: int,
    data: TelemetryRequest,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user),
):
    computer = db.query(Computer).filter(
        Computer.id == computer_id,
        Computer.is_active == True,
    ).first()
    if not computer:
        raise HTTPException(status_code=404, detail="Computer not found")

    if not 0 <= data.cpu_usage <= 100 or not 0 <= data.memory_usage <= 100:
        raise HTTPException(status_code=400, detail="CPU and memory usage must be between 0 and 100")
    if data.power_consumption < 0:
        raise HTTPException(status_code=400, detail="Power consumption cannot be negative")

    now = datetime.utcnow()
    previous_seen = computer.last_seen_at
    elapsed_seconds = 0.0
    if previous_seen:
        elapsed_seconds = max(0.0, min((now - previous_seen).total_seconds(), 300.0))

    energy_kwh = data.power_consumption * elapsed_seconds / 3_600_000.0
    carbon_kg = energy_kwh * CARBON_INTENSITY_G_PER_KWH / 1000.0

    computer.cpu_usage = data.cpu_usage
    computer.memory_usage = data.memory_usage
    computer.power_consumption = data.power_consumption
    computer.status = data.status if data.status in {"online", "idle"} else "online"
    computer.ip_address = data.ip_address or computer.ip_address
    computer.last_seen_at = now

    if elapsed_seconds > 0:
        db.add(EnergyLog(
            computer_id=computer.id,
            power_consumption=data.power_consumption,
            energy_consumed=energy_kwh,
        ))
        db.add(CarbonLog(
            computer_id=computer.id,
            energy_consumed=energy_kwh,
            carbon_emission=carbon_kg,
        ))

    db.commit()
    db.refresh(computer)
    return computer


@router.post("/", response_model=ComputerResponse, status_code=status.HTTP_201_CREATED)
def create_computer(
    data: ComputerCreate,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user),
):
    lab = db.query(Lab).filter(Lab.id == data.lab_id, Lab.is_active == True).first()
    if not lab:
        raise HTTPException(status_code=404, detail="Lab not found")

    existing = db.query(Computer).filter(Computer.hostname == data.hostname).first()
    if existing:
        raise HTTPException(status_code=400, detail="Computer hostname already exists")

    computer = Computer(**data.model_dump())
    db.add(computer)
    db.commit()
    db.refresh(computer)
    return computer


@router.get("/", response_model=list[ComputerResponse])
def get_computers(
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user),
):
    _refresh_stale_statuses(db)
    return db.query(Computer).filter(Computer.is_active == True).all()


@router.get("/{computer_id}", response_model=ComputerResponse)
def get_computer(
    computer_id: int,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user),
):
    _refresh_stale_statuses(db)
    computer = db.query(Computer).filter(Computer.id == computer_id, Computer.is_active == True).first()
    if not computer:
        raise HTTPException(status_code=404, detail="Computer not found")
    return computer


@router.put("/{computer_id}", response_model=ComputerResponse)
def update_computer(
    computer_id: int,
    data: ComputerCreate,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user),
):
    computer = db.query(Computer).filter(Computer.id == computer_id).first()
    if not computer:
        raise HTTPException(status_code=404, detail="Computer not found")

    lab = db.query(Lab).filter(Lab.id == data.lab_id, Lab.is_active == True).first()
    if not lab:
        raise HTTPException(status_code=404, detail="Lab not found")

    existing = db.query(Computer).filter(
        Computer.hostname == data.hostname,
        Computer.id != computer_id,
    ).first()
    if existing:
        raise HTTPException(status_code=400, detail="Computer hostname already exists")

    for field, value in data.model_dump().items():
        setattr(computer, field, value)

    db.commit()
    db.refresh(computer)
    return computer


@router.delete("/{computer_id}")
def delete_computer(
    computer_id: int,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user),
):
    computer = db.query(Computer).filter(Computer.id == computer_id).first()
    if not computer:
        raise HTTPException(status_code=404, detail="Computer not found")

    computer.is_active = False
    db.commit()
    return {"message": "Computer deleted successfully", "computer_id": computer_id}

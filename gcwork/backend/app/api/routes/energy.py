from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.api.dependencies import get_current_user
from app.core.database import get_db
from app.models.computer import Computer
from app.models.energy_log import EnergyLog
from app.schemas.energy import EnergyCreate, EnergyResponse


router = APIRouter(
    prefix="/energy",
    tags=["Energy"],
)


# Create a new energy log
@router.post(
    "/",
    response_model=EnergyResponse,
    status_code=status.HTTP_201_CREATED,
)
def create_energy_log(
    data: EnergyCreate,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user),
):
    # Check whether the computer exists
    computer = (
        db.query(Computer)
        .filter(
            Computer.id == data.computer_id,
            Computer.is_active == True,
        )
        .first()
    )

    if not computer:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Computer not found",
        )

    # Validate energy values
    if data.power_consumption < 0:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Power consumption cannot be negative",
        )

    if data.energy_consumed < 0:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Energy consumed cannot be negative",
        )

    energy_log = EnergyLog(
        computer_id=data.computer_id,
        power_consumption=data.power_consumption,
        energy_consumed=data.energy_consumed,
    )

    db.add(energy_log)
    db.commit()
    db.refresh(energy_log)

    return energy_log


# Get all energy logs
@router.get(
    "/",
    response_model=list[EnergyResponse],
)
def get_energy_logs(
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user),
):
    return (
        db.query(EnergyLog)
        .order_by(EnergyLog.recorded_at.desc())
        .all()
    )


# Get energy logs for a specific computer
@router.get(
    "/computer/{computer_id}",
    response_model=list[EnergyResponse],
)
def get_computer_energy_logs(
    computer_id: int,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user),
):
    # Check whether the computer exists
    computer = (
        db.query(Computer)
        .filter(
            Computer.id == computer_id,
            Computer.is_active == True,
        )
        .first()
    )

    if not computer:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Computer not found",
        )

    return (
        db.query(EnergyLog)
        .filter(EnergyLog.computer_id == computer_id)
        .order_by(EnergyLog.recorded_at.desc())
        .all()
    )


# Get a single energy log
@router.get(
    "/{energy_id}",
    response_model=EnergyResponse,
)
def get_energy_log(
    energy_id: int,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user),
):
    energy_log = (
        db.query(EnergyLog)
        .filter(EnergyLog.id == energy_id)
        .first()
    )

    if not energy_log:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Energy log not found",
        )

    return energy_log


# Delete an energy log
@router.delete(
    "/{energy_id}",
)
def delete_energy_log(
    energy_id: int,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user),
):
    energy_log = (
        db.query(EnergyLog)
        .filter(EnergyLog.id == energy_id)
        .first()
    )

    if not energy_log:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Energy log not found",
        )

    db.delete(energy_log)
    db.commit()

    return {
        "message": "Energy log deleted successfully",
        "energy_id": energy_id,
    }
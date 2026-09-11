from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.api.dependencies import get_current_user
from app.core.database import get_db
from app.models.computer import Computer
from app.models.carbon_log import CarbonLog
from app.schemas.carbon import CarbonCreate, CarbonResponse

router = APIRouter(
    prefix="/carbon",
    tags=["Carbon"],
)


@router.post(
    "/",
    response_model=CarbonResponse,
    status_code=status.HTTP_201_CREATED,
)
def create_carbon_log(
    data: CarbonCreate,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user),
):
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

    if data.energy_consumed < 0:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Energy consumed cannot be negative",
        )

    if data.carbon_emission < 0:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Carbon emission cannot be negative",
        )

    carbon_log = CarbonLog(
        computer_id=data.computer_id,
        energy_consumed=data.energy_consumed,
        carbon_emission=data.carbon_emission,
    )

    db.add(carbon_log)
    db.commit()
    db.refresh(carbon_log)

    return carbon_log


@router.get(
    "/",
    response_model=list[CarbonResponse],
)
def get_carbon_logs(
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user),
):
    return (
        db.query(CarbonLog)
        .order_by(CarbonLog.recorded_at.desc())
        .all()
    )


@router.get(
    "/computer/{computer_id}",
    response_model=list[CarbonResponse],
)
def get_computer_carbon_logs(
    computer_id: int,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user),
):
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
        db.query(CarbonLog)
        .filter(CarbonLog.computer_id == computer_id)
        .order_by(CarbonLog.recorded_at.desc())
        .all()
    )


@router.get(
    "/{carbon_id}",
    response_model=CarbonResponse,
)
def get_carbon_log(
    carbon_id: int,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user),
):
    carbon_log = (
        db.query(CarbonLog)
        .filter(CarbonLog.id == carbon_id)
        .first()
    )

    if not carbon_log:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Carbon log not found",
        )

    return carbon_log


@router.delete(
    "/{carbon_id}",
)
def delete_carbon_log(
    carbon_id: int,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user),
):
    carbon_log = (
        db.query(CarbonLog)
        .filter(CarbonLog.id == carbon_id)
        .first()
    )

    if not carbon_log:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Carbon log not found",
        )

    db.delete(carbon_log)
    db.commit()

    return {
        "message": "Carbon log deleted successfully",
        "carbon_id": carbon_id,
    }
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.api.dependencies import get_current_user
from app.core.database import get_db
from app.models.computer import Computer
from app.models.shutdown import ShutdownLog
from app.schemas.shutdown import ShutdownCreate, ShutdownResponse

router = APIRouter(
    prefix="/shutdown",
    tags=["Shutdown"],
)


@router.post(
    "/",
    response_model=ShutdownResponse,
    status_code=status.HTTP_201_CREATED,
)
def create_shutdown_request(
    data: ShutdownCreate,
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

    shutdown_log = ShutdownLog(
        computer_id=data.computer_id,
        requested_by=data.requested_by or current_user["id"],
        action=data.action,
        reason=data.reason,
        status="pending",
    )

    db.add(shutdown_log)
    db.commit()
    db.refresh(shutdown_log)

    return shutdown_log


@router.get(
    "/",
    response_model=list[ShutdownResponse],
)
def get_shutdown_logs(
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user),
):
    return (
        db.query(ShutdownLog)
        .order_by(ShutdownLog.created_at.desc())
        .all()
    )


@router.get(
    "/computer/{computer_id}",
    response_model=list[ShutdownResponse],
)
def get_computer_shutdown_logs(
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
        db.query(ShutdownLog)
        .filter(ShutdownLog.computer_id == computer_id)
        .order_by(ShutdownLog.created_at.desc())
        .all()
    )


@router.get(
    "/{shutdown_id}",
    response_model=ShutdownResponse,
)
def get_shutdown_log(
    shutdown_id: int,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user),
):
    shutdown_log = (
        db.query(ShutdownLog)
        .filter(ShutdownLog.id == shutdown_id)
        .first()
    )

    if not shutdown_log:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Shutdown log not found",
        )

    return shutdown_log


@router.delete(
    "/{shutdown_id}",
)
def delete_shutdown_log(
    shutdown_id: int,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user),
):
    shutdown_log = (
        db.query(ShutdownLog)
        .filter(ShutdownLog.id == shutdown_id)
        .first()
    )

    if not shutdown_log:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Shutdown log not found",
        )

    db.delete(shutdown_log)
    db.commit()

    return {
        "message": "Shutdown log deleted successfully",
        "shutdown_id": shutdown_id,
    }
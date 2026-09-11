from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.api.dependencies import get_current_user
from app.core.database import get_db
from app.models.lab import Lab
from app.schemas.lab import LabCreate, LabResponse


router = APIRouter(
    prefix="/labs",
    tags=["Labs"],
)


# Create a new lab
@router.post(
    "/",
    response_model=LabResponse,
    status_code=status.HTTP_201_CREATED,
)
def create_lab(
    data: LabCreate,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user),
):
    # Check if lab code already exists
    existing_lab = (
        db.query(Lab)
        .filter(Lab.code == data.code)
        .first()
    )

    if existing_lab:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Lab code already exists",
        )

    lab = Lab(
        name=data.name,
        code=data.code,
        department_id=data.department_id,
        location=data.location,
        capacity=data.capacity,
    )

    db.add(lab)
    db.commit()
    db.refresh(lab)

    return lab


# Get all labs
@router.get(
    "/",
    response_model=list[LabResponse],
)
def get_labs(
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user),
):
    return (
        db.query(Lab)
        .filter(Lab.is_active == True)
        .all()
    )


# Get a single lab by ID
@router.get(
    "/{lab_id}",
    response_model=LabResponse,
)
def get_lab(
    lab_id: int,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user),
):
    lab = (
        db.query(Lab)
        .filter(
            Lab.id == lab_id,
            Lab.is_active == True,
        )
        .first()
    )

    if not lab:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Lab not found",
        )

    return lab


# Update a lab
@router.put(
    "/{lab_id}",
    response_model=LabResponse,
)
def update_lab(
    lab_id: int,
    data: LabCreate,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user),
):
    lab = (
        db.query(Lab)
        .filter(Lab.id == lab_id)
        .first()
    )

    if not lab:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Lab not found",
        )

    # Check duplicate code
    existing_lab = (
        db.query(Lab)
        .filter(
            Lab.code == data.code,
            Lab.id != lab_id,
        )
        .first()
    )

    if existing_lab:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Lab code already exists",
        )

    lab.name = data.name
    lab.code = data.code
    lab.department_id = data.department_id
    lab.location = data.location
    lab.capacity = data.capacity

    db.commit()
    db.refresh(lab)

    return lab


# Delete a lab (soft delete)
@router.delete(
    "/{lab_id}",
)
def delete_lab(
    lab_id: int,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user),
):
    lab = (
        db.query(Lab)
        .filter(Lab.id == lab_id)
        .first()
    )

    if not lab:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Lab not found",
        )

    lab.is_active = False

    db.commit()

    return {
        "message": "Lab deleted successfully",
        "lab_id": lab_id,
    }
from fastapi import APIRouter, Depends

from app.api.dependencies import get_current_user
from app.schemas.analytics import (
    EnergyAnalysisRequest,
    CarbonAnalysisRequest,
    SustainabilityScoreRequest,
)
from app.services.ai_service import ai_service


router = APIRouter(
    prefix="/analytics",
    tags=["Analytics"],
)


@router.post("/ai/energy")
def analyze_energy(
    data: EnergyAnalysisRequest,
    current_user=Depends(get_current_user),
):
    return ai_service.analyze_energy(
        energy_consumed=data.energy_consumed,
        power_consumption=data.power_consumption,
        computer_count=data.computer_count,
    )


@router.post("/ai/carbon")
def analyze_carbon(
    data: CarbonAnalysisRequest,
    current_user=Depends(get_current_user),
):
    return ai_service.analyze_carbon(
        energy_consumed=data.energy_consumed,
        carbon_emission=data.carbon_emission,
    )


@router.post("/ai/sustainability-score")
def sustainability_score(
    data: SustainabilityScoreRequest,
    current_user=Depends(get_current_user),
):
    return ai_service.generate_sustainability_score(
        energy_consumed=data.energy_consumed,
        carbon_emission=data.carbon_emission,
        active_computers=data.active_computers,
        total_computers=data.total_computers,
    )
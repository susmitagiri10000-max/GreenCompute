from pydantic import BaseModel


class EnergyAnalysisRequest(BaseModel):
    energy_consumed: float
    power_consumption: float
    computer_count: int = 1


class CarbonAnalysisRequest(BaseModel):
    energy_consumed: float
    carbon_emission: float


class SustainabilityScoreRequest(BaseModel):
    energy_consumed: float
    carbon_emission: float
    active_computers: int
    total_computers: int
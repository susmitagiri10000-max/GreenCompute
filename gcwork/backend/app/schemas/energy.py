from datetime import datetime

from pydantic import BaseModel, ConfigDict


class EnergyBase(BaseModel):
    computer_id: int
    power_consumption: float
    energy_consumed: float


class EnergyCreate(EnergyBase):
    pass


class EnergyResponse(EnergyBase):
    id: int
    recorded_at: datetime

    model_config = ConfigDict(from_attributes=True)
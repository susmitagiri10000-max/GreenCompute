from datetime import datetime

from pydantic import BaseModel, ConfigDict


class CarbonBase(BaseModel):
    computer_id: int
    energy_consumed: float
    carbon_emission: float


class CarbonCreate(CarbonBase):
    pass


class CarbonResponse(CarbonBase):
    id: int
    recorded_at: datetime

    model_config = ConfigDict(from_attributes=True)
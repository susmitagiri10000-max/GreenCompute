from datetime import datetime

from pydantic import BaseModel, ConfigDict


class ComputerBase(BaseModel):
    name: str
    hostname: str
    lab_id: int
    ip_address: str | None = None
    status: str = "offline"
    cpu_usage: float = 0.0
    memory_usage: float = 0.0
    power_consumption: float = 0.0


class ComputerCreate(ComputerBase):
    pass


class AgentRegisterRequest(BaseModel):
    hostname: str
    name: str | None = None
    lab_id: int
    ip_address: str | None = None


class TelemetryRequest(BaseModel):
    cpu_usage: float
    memory_usage: float
    power_consumption: float
    status: str = "online"
    ip_address: str | None = None


class ComputerResponse(ComputerBase):
    id: int
    is_active: bool
    last_seen_at: datetime | None = None

    model_config = ConfigDict(from_attributes=True)

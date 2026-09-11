from datetime import datetime

from pydantic import BaseModel, ConfigDict


class ShutdownBase(BaseModel):
    computer_id: int
    action: str = "shutdown"
    reason: str | None = None


class ShutdownCreate(ShutdownBase):
    requested_by: int | None = None


class ShutdownResponse(ShutdownBase):
    id: int
    requested_by: int | None
    status: str
    created_at: datetime

    model_config = ConfigDict(from_attributes=True)
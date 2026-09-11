from pydantic import BaseModel, ConfigDict


class LabBase(BaseModel):
    name: str
    code: str
    department_id: int
    location: str | None = None
    capacity: int = 0


class LabCreate(LabBase):
    pass


class LabResponse(LabBase):
    id: int
    is_active: bool

    model_config = ConfigDict(from_attributes=True)
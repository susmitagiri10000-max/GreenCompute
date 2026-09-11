from pydantic import BaseModel, ConfigDict


class DepartmentBase(BaseModel):
    name: str
    code: str
    description: str | None = None


class DepartmentCreate(DepartmentBase):
    pass


class DepartmentResponse(DepartmentBase):
    id: int
    is_active: bool

    model_config = ConfigDict(from_attributes=True)
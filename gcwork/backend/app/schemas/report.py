from datetime import datetime

from pydantic import BaseModel, ConfigDict


class ReportBase(BaseModel):
    title: str
    report_type: str
    description: str | None = None


class ReportCreate(ReportBase):
    generated_by: int | None = None


class ReportResponse(ReportBase):
    id: int
    generated_by: int | None
    file_path: str | None
    created_at: datetime

    model_config = ConfigDict(from_attributes=True)
from datetime import datetime

from sqlalchemy import Boolean, DateTime, Float, ForeignKey, Integer, String
from sqlalchemy.orm import Mapped, mapped_column

from app.core.database import Base


class Computer(Base):
    __tablename__ = "computers"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, index=True)
    name: Mapped[str] = mapped_column(String(100), nullable=False)
    hostname: Mapped[str] = mapped_column(String(100), unique=True, nullable=False)
    lab_id: Mapped[int] = mapped_column(ForeignKey("labs.id"), nullable=False)
    ip_address: Mapped[str | None] = mapped_column(String(45), nullable=True)
    status: Mapped[str] = mapped_column(String(30), default="offline", nullable=False)
    cpu_usage: Mapped[float] = mapped_column(Float, default=0.0, nullable=False)
    memory_usage: Mapped[float] = mapped_column(Float, default=0.0, nullable=False)
    power_consumption: Mapped[float] = mapped_column(Float, default=0.0, nullable=False)
    last_seen_at: Mapped[datetime | None] = mapped_column(DateTime, nullable=True, index=True)
    is_active: Mapped[bool] = mapped_column(Boolean, default=True, nullable=False)

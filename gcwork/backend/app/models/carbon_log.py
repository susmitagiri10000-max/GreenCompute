from datetime import datetime

from sqlalchemy import DateTime, Float, ForeignKey, Integer
from sqlalchemy.orm import Mapped, mapped_column

from app.core.database import Base


class CarbonLog(Base):
    __tablename__ = "carbon_logs"

    id: Mapped[int] = mapped_column(
        Integer,
        primary_key=True,
        index=True,
    )

    computer_id: Mapped[int] = mapped_column(
        ForeignKey("computers.id"),
        nullable=False,
        index=True,
    )

    energy_consumed: Mapped[float] = mapped_column(
        Float,
        nullable=False,
    )

    carbon_emission: Mapped[float] = mapped_column(
        Float,
        nullable=False,
    )

    recorded_at: Mapped[datetime] = mapped_column(
        DateTime,
        default=datetime.utcnow,
        nullable=False,
        index=True,
    )
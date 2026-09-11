from datetime import datetime

from sqlalchemy import DateTime, Float, ForeignKey, Integer
from sqlalchemy.orm import Mapped, mapped_column

from app.core.database import Base


class EnergyLog(Base):
    __tablename__ = "energy_logs"

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

    power_consumption: Mapped[float] = mapped_column(
        Float,
        nullable=False,
    )

    energy_consumed: Mapped[float] = mapped_column(
        Float,
        nullable=False,
    )

    recorded_at: Mapped[datetime] = mapped_column(
        DateTime,
        default=datetime.utcnow,
        nullable=False,
        index=True,
    )
from datetime import datetime, timedelta

from fastapi import APIRouter, Depends, Query
from sqlalchemy import func
from sqlalchemy.orm import Session

from app.api.dependencies import get_current_user
from app.core.database import get_db
from app.models.carbon_log import CarbonLog
from app.models.computer import Computer
from app.models.energy_log import EnergyLog


router = APIRouter(
    prefix="/reports",
    tags=["Reports"],
)


# ============================================================
# PERIOD HELPER
# ============================================================

def get_period_start(period: str) -> datetime:
    """
    Return the starting datetime for the selected report period.
    """

    now = datetime.utcnow()

    if period == "7d":
        return now - timedelta(days=7)

    if period == "30d":
        return now - timedelta(days=30)

    if period == "90d":
        return now - timedelta(days=90)

    if period == "1y":
        return now - timedelta(days=365)

    # Safety fallback
    return now - timedelta(days=30)


# ============================================================
# REPORT SUMMARY
# ============================================================

@router.get("/summary")
def get_report_summary(
    period: str = Query(
        default="30d",
        pattern="^(7d|30d|90d|1y)$",
        description="Report period",
    ),

    department: str = Query(
        default="all",
        description="Department filter",
    ),

    db: Session = Depends(get_db),

    current_user=Depends(
        get_current_user
    ),
):
    """
    Return real sustainability report data
    from EnergyLog, CarbonLog and Computer tables.
    """

    # --------------------------------------------------------
    # Date range
    # --------------------------------------------------------

    end_date = datetime.utcnow()

    start_date = get_period_start(
        period
    )

    # --------------------------------------------------------
    # ENERGY
    # --------------------------------------------------------

    energy_query = (
        db.query(
            func.coalesce(
                func.sum(
                    EnergyLog.energy_consumed
                ),
                0,
            )
        )
        .join(
            Computer,
            Computer.id
            == EnergyLog.computer_id,
        )
        .filter(
            EnergyLog.recorded_at
            >= start_date,

            EnergyLog.recorded_at
            <= end_date,

            Computer.is_active
            == True,
        )
    )

    energy_used = (
        energy_query.scalar()
        or 0
    )

    energy_used = float(
        energy_used
    )

    # --------------------------------------------------------
    # CARBON
    # --------------------------------------------------------

    carbon_query = (
        db.query(
            func.coalesce(
                func.sum(
                    CarbonLog.carbon_emission
                ),
                0,
            )
        )
        .join(
            Computer,
            Computer.id
            == CarbonLog.computer_id,
        )
        .filter(
            CarbonLog.recorded_at
            >= start_date,

            CarbonLog.recorded_at
            <= end_date,

            Computer.is_active
            == True,
        )
    )

    carbon_emitted = (
        carbon_query.scalar()
        or 0
    )

    carbon_emitted = float(
        carbon_emitted
    )

    # --------------------------------------------------------
    # ACTIVE COMPUTERS
    # --------------------------------------------------------

    computer_count = (
        db.query(
            func.count(
                Computer.id
            )
        )
        .filter(
            Computer.is_active
            == True
        )
        .scalar()
        or 0
    )

    computer_count = int(
        computer_count
    )

    # --------------------------------------------------------
    # CURRENT POWER
    # --------------------------------------------------------

    total_current_power = (
        db.query(
            func.coalesce(
                func.sum(
                    Computer.power_consumption
                ),
                0,
            )
        )
        .filter(
            Computer.is_active
            == True
        )
        .scalar()
        or 0
    )

    total_current_power = float(
        total_current_power
    )

    # ========================================================
    # IMPORTANT
    # ========================================================
    #
    # These values are NOT currently stored/calculated
    # in the database:
    #
    #   energySaved
    #   carbonSaved
    #   costSaved
    #   ecoScore
    #
    # Therefore we DO NOT generate fake values.
    #
    # Frontend will show N/A for these metrics.
    # ========================================================

    energy_saved = 0.0

    carbon_saved = 0.0

    cost_saved = 0.0

    eco_score = None

    # --------------------------------------------------------
    # RETURN RESPONSE
    # --------------------------------------------------------

    return {
        "period": period,

        "department": department,

        "energyUsed": round(
            energy_used,
            4,
        ),

        "energySaved": round(
            energy_saved,
            4,
        ),

        "carbonEmitted": round(
            carbon_emitted,
            4,
        ),

        "carbonSaved": round(
            carbon_saved,
            4,
        ),

        "costSaved": round(
            cost_saved,
            2,
        ),

        "ecoScore": eco_score,

        "computerCount": computer_count,

        "currentPower": round(
            total_current_power,
            2,
        ),

        "periodStart": (
            start_date.isoformat()
        ),

        "periodEnd": (
            end_date.isoformat()
        ),
    }
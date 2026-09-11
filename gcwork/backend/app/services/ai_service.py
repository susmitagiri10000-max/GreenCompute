from typing import Any


class AIService:
    """
    GreenCompute AI service.

    This service analyzes energy, carbon, and computer
    monitoring data and generates sustainability insights.
    """

    def analyze_energy(
        self,
        energy_consumed: float,
        power_consumption: float,
        computer_count: int = 1,
    ) -> dict[str, Any]:

        if energy_consumed < 0:
            energy_consumed = 0

        if power_consumption < 0:
            power_consumption = 0

        if computer_count < 1:
            computer_count = 1

        average_energy = energy_consumed / computer_count

        if energy_consumed >= 100:
            status = "high"
            recommendation = (
                "Energy consumption is high. "
                "Consider reducing computer idle time "
                "and enabling automatic power-saving policies."
            )

        elif energy_consumed >= 50:
            status = "medium"
            recommendation = (
                "Energy consumption is moderate. "
                "Monitor high-power computers and reduce unnecessary usage."
            )

        else:
            status = "low"
            recommendation = (
                "Energy consumption is within a relatively low range. "
                "Continue monitoring and maintain power-saving practices."
            )

        return {
            "status": status,
            "energy_consumed": round(energy_consumed, 2),
            "power_consumption": round(power_consumption, 2),
            "computer_count": computer_count,
            "average_energy_per_computer": round(average_energy, 2),
            "recommendation": recommendation,
        }

    def analyze_carbon(
        self,
        energy_consumed: float,
        carbon_emission: float,
    ) -> dict[str, Any]:

        if energy_consumed <= 0:
            emission_factor = 0
        else:
            emission_factor = carbon_emission / energy_consumed

        if carbon_emission >= 100:
            status = "high"
            recommendation = (
                "Carbon emissions are high. "
                "Reduce energy consumption and prioritize "
                "energy-efficient computing."
            )

        elif carbon_emission >= 50:
            status = "medium"
            recommendation = (
                "Carbon emissions are moderate. "
                "Consider optimizing computer usage and shutdown schedules."
            )

        else:
            status = "low"
            recommendation = (
                "Carbon emissions are relatively low. "
                "Continue monitoring energy usage."
            )

        return {
            "status": status,
            "energy_consumed": round(energy_consumed, 2),
            "carbon_emission": round(carbon_emission, 2),
            "emission_factor": round(emission_factor, 4),
            "recommendation": recommendation,
        }

    def generate_sustainability_score(
        self,
        energy_consumed: float,
        carbon_emission: float,
        active_computers: int,
        total_computers: int,
    ) -> dict[str, Any]:

        if total_computers <= 0:
            utilization = 0
        else:
            utilization = (active_computers / total_computers) * 100

        score = 100.0

        # Energy penalty
        if energy_consumed > 100:
            score -= 30
        elif energy_consumed > 50:
            score -= 15

        # Carbon penalty
        if carbon_emission > 100:
            score -= 30
        elif carbon_emission > 50:
            score -= 15

        # Computer utilization penalty
        if utilization < 30:
            score -= 15

        score = max(0, min(100, score))

        if score >= 80:
            rating = "Excellent"
        elif score >= 60:
            rating = "Good"
        elif score >= 40:
            rating = "Needs Improvement"
        else:
            rating = "Poor"

        return {
            "score": round(score, 2),
            "rating": rating,
            "computer_utilization": round(utilization, 2),
        }


ai_service = AIService()
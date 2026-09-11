
## Live computer monitoring

The project now includes `agent/monitor_agent.py`. Run it on a real Windows computer to send live CPU/RAM/hostname/IP telemetry to the backend. The backend persists telemetry into the database and automatically creates energy/carbon log entries.

Energy is explicitly marked as an **estimate** unless a physical power meter is connected. Configure `IDLE_WATTS` and `MAX_WATTS` in `agent/.env` instead of using random values.

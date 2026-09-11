# GreenCompute Live Monitoring Agent

This agent turns the **computer running it** into a real monitored machine.
It sends live CPU usage, RAM usage, hostname, IP and an estimated power value to the GreenCompute backend.

## Important

- CPU/RAM/hostname/IP are live values from the machine.
- Energy is **estimated**, not physically measured.
- A physical power meter is required for wall-socket electricity measurement.
- `IDLE_WATTS` and `MAX_WATTS` should be configured from the computer's documented power characteristics when possible.

## Windows setup

Open PowerShell in this `agent` folder:

```powershell
python -m venv .venv
.\.venv\Scripts\Activate.ps1
python -m pip install -r requirements.txt
copy .env.example .env
```

Edit `.env` and set `LAB_ID` to the lab where this computer belongs.

Start the agent:

```powershell
python monitor_agent.py
```

You should see changing values such as:

```text
CPU=17.4% | RAM=48.2% | Power≈33.9W | Status=online
CPU=62.1% | RAM=51.0% | Power≈69.7W | Status=online
```

Those values are read from the actual PC at runtime; they are not seeded dashboard records.

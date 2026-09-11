"""GreenCompute Windows monitoring agent.

Reads live CPU/RAM/hostname/IP information from the machine and sends it to
GreenCompute. Energy is ESTIMATED from configured idle/max watts because a
normal PC cannot know wall-socket electricity without a physical meter.
"""

import os
import socket
import time
from pathlib import Path

import psutil
import requests

try:
    from dotenv import load_dotenv
    load_dotenv(Path(__file__).with_name(".env"))
except ImportError:
    pass

API_BASE_URL = os.getenv("API_BASE_URL", "https://greencompute-backend.onrender.com").rstrip("/")
API_TOKEN = os.getenv("API_TOKEN", "greencompute_demo_token")
LAB_ID = int(os.getenv("LAB_ID", "1"))
COMPUTER_NAME = os.getenv("COMPUTER_NAME", "")
INTERVAL_SECONDS = max(5, int(os.getenv("INTERVAL_SECONDS", "10")))
IDLE_WATTS = float(os.getenv("IDLE_WATTS", "20"))
MAX_WATTS = max(IDLE_WATTS, float(os.getenv("MAX_WATTS", "100")))
IDLE_CPU_THRESHOLD = float(os.getenv("IDLE_CPU_THRESHOLD", "10"))

SESSION = requests.Session()
SESSION.headers.update({
    "Authorization": f"Bearer {API_TOKEN}",
    "Accept": "application/json",
    "Content-Type": "application/json",
})


def local_ip() -> str | None:
    try:
        sock = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
        sock.connect(("8.8.8.8", 80))
        ip = sock.getsockname()[0]
        sock.close()
        return ip
    except OSError:
        return None


def api(method: str, path: str, payload=None):
    response = SESSION.request(method, f"{API_BASE_URL}{path}", json=payload, timeout=10)
    response.raise_for_status()
    return response.json()


def register() -> int:
    hostname = socket.gethostname()
    payload = {
        "hostname": hostname,
        "name": COMPUTER_NAME or hostname,
        "lab_id": LAB_ID,
        "ip_address": local_ip(),
    }
    data = api("POST", "/computers/register-agent", payload)
    return int(data["id"])


def estimated_power(cpu_percent: float) -> float:
    """Linear utilization-based estimate; not a physical watt-meter reading."""
    utilization = min(100.0, max(0.0, cpu_percent)) / 100.0
    return round(IDLE_WATTS + (MAX_WATTS - IDLE_WATTS) * utilization, 2)


def run():
    print("GreenCompute Monitoring Agent")
    print(f"Backend: {API_BASE_URL}")
    print(f"Lab ID: {LAB_ID}")
    print("Energy mode: ESTIMATED from CPU utilization (no physical meter)")

    computer_id = register()
    print(f"Registered computer ID: {computer_id}")
    print("Live telemetry started. Press Ctrl+C to stop.\n")

    # Prime psutil so the first reading is meaningful.
    psutil.cpu_percent(interval=None)

    while True:
        try:
            cpu = psutil.cpu_percent(interval=1.0)
            memory = psutil.virtual_memory().percent
            power = estimated_power(cpu)
            status = "idle" if cpu < IDLE_CPU_THRESHOLD else "online"

            payload = {
                "cpu_usage": round(cpu, 2),
                "memory_usage": round(memory, 2),
                "power_consumption": power,
                "status": status,
                "ip_address": local_ip(),
            }

            data = api("POST", f"/computers/{computer_id}/telemetry", payload)
            print(
                f"[{time.strftime('%H:%M:%S')}] "
                f"CPU={data['cpu_usage']:.1f}% | "
                f"RAM={data['memory_usage']:.1f}% | "
                f"Power≈{data['power_consumption']:.1f}W | "
                f"Status={data['status']}"
            )
            time.sleep(max(1, INTERVAL_SECONDS - 1))
        except KeyboardInterrupt:
            print("\nMonitoring agent stopped.")
            break
        except requests.RequestException as exc:
            print(f"Backend connection error: {exc}")
            time.sleep(INTERVAL_SECONDS)
        except Exception as exc:
            print(f"Agent error: {exc}")
            time.sleep(INTERVAL_SECONDS)


if __name__ == "__main__":
    run()

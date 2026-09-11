from app.schemas.user import UserBase, UserCreate, UserResponse
from app.schemas.auth import LoginRequest, TokenResponse
from app.schemas.department import DepartmentBase, DepartmentCreate, DepartmentResponse
from app.schemas.lab import LabBase, LabCreate, LabResponse
from app.schemas.computer import ComputerBase, ComputerCreate, ComputerResponse
from app.schemas.energy import EnergyBase, EnergyCreate, EnergyResponse
from app.schemas.carbon import CarbonBase, CarbonCreate, CarbonResponse
from app.schemas.shutdown import ShutdownBase, ShutdownCreate, ShutdownResponse
from app.schemas.report import ReportBase, ReportCreate, ReportResponse


__all__ = [
    "UserBase",
    "UserCreate",
    "UserResponse",
    "LoginRequest",
    "TokenResponse",
    "DepartmentBase",
    "DepartmentCreate",
    "DepartmentResponse",
    "LabBase",
    "LabCreate",
    "LabResponse",
    "ComputerBase",
    "ComputerCreate",
    "ComputerResponse",
    "EnergyBase",
    "EnergyCreate",
    "EnergyResponse",
    "CarbonBase",
    "CarbonCreate",
    "CarbonResponse",
    "ShutdownBase",
    "ShutdownCreate",
    "ShutdownResponse",
    "ReportBase",
    "ReportCreate",
    "ReportResponse",
]
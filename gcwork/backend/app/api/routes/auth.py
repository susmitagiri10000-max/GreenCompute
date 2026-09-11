from fastapi import APIRouter
from app.schemas.auth import LoginRequest, TokenResponse

router = APIRouter(prefix="/auth", tags=["Authentication"])


@router.post("/login", response_model=TokenResponse)
def login(data: LoginRequest):
    # Temporary demo authentication
    if data.email == "susmita24@gmail.com" and data.password == "sumi@245":
        return {
            "access_token": "greencompute_demo_token",
            "token_type": "bearer",
        }

    return {
        "access_token": "invalid_credentials",
        "token_type": "bearer",
    }
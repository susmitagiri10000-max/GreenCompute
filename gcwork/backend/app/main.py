import os
from sqlalchemy import inspect, text
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.core.database import Base, engine
from app.api.routes.auth import router as auth_router
from app.api.routes.departments import router as departments_router
from app.api.routes.analytics import router as analytics_router
from app.api.routes.labs import router as labs_router
from app.api.routes.computers import router as computers_router
from app.api.routes.energy import router as energy_router
from app.api.routes.carbon import router as carbon_router
from app.api.routes.shutdown import router as shutdown_router
from app.api.routes.reports import router as reports_router

# Import models before create_all so SQLAlchemy knows every table.
from app.models import carbon_log, computer, department, energy_log, lab, report, shutdown, user  # noqa: F401,E402

app = FastAPI(
    title="GreenCompute API",
    description="Digital Sustainability Monitoring Platform with live computer telemetry",
    version="2.0.0",
)

cors_origins = [
    item.strip()
    for item in os.getenv(
        "CORS_ORIGINS",
        "http://localhost:5173,http://localhost:5174,http://localhost:5175", "https://greencompute-frontend.onrender.com",
    ).split(",")
    if item.strip()
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=cors_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


def ensure_database_schema():
    Base.metadata.create_all(bind=engine)

    # create_all does not add newly introduced columns to an existing SQLite DB.
    # Add the telemetry heartbeat column when upgrading an existing local database.
    inspector = inspect(engine)
    if "computers" in inspector.get_table_names():
        columns = {column["name"] for column in inspector.get_columns("computers")}
        if "last_seen_at" not in columns:
            with engine.begin() as connection:
                connection.execute(text("ALTER TABLE computers ADD COLUMN last_seen_at DATETIME"))


ensure_database_schema()

app.include_router(auth_router)
app.include_router(departments_router)
app.include_router(analytics_router)
app.include_router(labs_router)
app.include_router(computers_router)
app.include_router(energy_router)
app.include_router(carbon_router)
app.include_router(shutdown_router)
app.include_router(reports_router)


@app.get("/")
def root():
    return {
        "message": "GreenCompute API is running",
        "status": "success",
        "telemetry": "enabled",
    }


@app.get("/health")
def health_check():
    return {
        "status": "healthy",
        "service": "GreenCompute Backend",
        "telemetry": "enabled",
    }

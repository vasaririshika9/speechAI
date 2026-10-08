"""Core configuration module."""
import os
from pathlib import Path
from dotenv import load_dotenv

# Load environment variables from .env file if present
BASE_DIR = Path(__file__).resolve().parent.parent.parent
load_dotenv(BASE_DIR / ".env")

FRONTEND_URL = os.getenv("FRONTEND_URL", "http://localhost:5173")
DATABASE_URL = os.getenv("DATABASE_URL", "sqlite:///./speech_diagnosis.db")

# Allow multiple comma-separated CORS origins or single URL
CORS_ORIGINS = [origin.strip() for origin in FRONTEND_URL.split(",") if origin.strip()]
if "http://localhost:5173" not in CORS_ORIGINS:
    CORS_ORIGINS.append("http://localhost:5173")

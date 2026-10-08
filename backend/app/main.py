"""Main FastAPI application entry point."""
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.core.config import CORS_ORIGINS
from app.models.schemas import HealthResponse
from app.api.analyze import router as analyze_router
from app.api.results import router as results_router

app = FastAPI(
    title="Speech Diagnosis API",
    description="Contrastive Speech Analytics & Temporal Flaw Grounding Backend",
    version="0.1.0",
    docs_url="/docs",
    redoc_url="/redoc"
)

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Health endpoint
@app.get("/health", response_model=HealthResponse, tags=["Health"])
async def health_check():
    """Health check endpoint to verify backend status."""
    return {
        "status": "ok",
        "message": "Speech Diagnosis backend is running"
    }

# Register API routers
app.include_router(analyze_router)
app.include_router(results_router)

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("app.main:app", host="0.0.0.0", port=8000, reload=True)

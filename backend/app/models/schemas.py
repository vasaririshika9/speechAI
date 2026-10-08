"""Pydantic schemas for request and response validation."""
from typing import List, Dict, Optional, Any
from pydantic import BaseModel, Field

class HealthResponse(BaseModel):
    status: str
    message: str

class AnalyzeResponse(BaseModel):
    analysis_id: str
    status: str
    message: str

class CategoryScores(BaseModel):
    pacing: int = Field(..., description="Pacing score (0-100)")
    pitch: int = Field(..., description="Pitch variation score (0-100)")
    pause_control: int = Field(..., description="Pause control score (0-100)")
    energy: int = Field(..., description="Vocal energy score (0-100)")
    clarity: int = Field(..., description="Speech clarity score (0-100)")

class Segment(BaseModel):
    id: int
    start: float
    end: float
    type: str
    severity: str
    confidence: float
    measured: float
    reference: float
    explanation: str
    recommendation: str

class SpeechRateFeature(BaseModel):
    average_wpm: float
    reference_wpm: float

class PitchFeature(BaseModel):
    mean_f0: float
    pitch_variance: float

class PausesFeature(BaseModel):
    count: int
    average_duration: float
    longest_duration: float

class EnergyFeature(BaseModel):
    average: float

class Features(BaseModel):
    speech_rate: SpeechRateFeature
    pitch: PitchFeature
    pauses: PausesFeature
    energy: EnergyFeature

class AnalysisResultResponse(BaseModel):
    analysis_id: str
    status: str
    overall_score: int
    category_scores: CategoryScores
    transcript: str
    segments: List[Segment]
    features: Features

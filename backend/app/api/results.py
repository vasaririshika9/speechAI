"""Results endpoint router."""
from fastapi import APIRouter, HTTPException
from app.models.schemas import AnalysisResultResponse

router = APIRouter(tags=["Results"])

MOCK_RESULT = {
    "analysis_id": "demo-001",
    "status": "completed",
    "overall_score": 78,
    "category_scores": {
        "pacing": 82,
        "pitch": 71,
        "pause_control": 64,
        "energy": 86,
        "clarity": 80
    },
    "transcript": "Our product helps businesses reduce customer support time by forty percent.",
    "segments": [
        {
            "id": 1,
            "start": 12.4,
            "end": 16.1,
            "type": "TOO_FAST",
            "severity": "HIGH",
            "confidence": 0.91,
            "measured": 205.0,
            "reference": 145.0,
            "explanation": "The speech rate is significantly higher than the reference range.",
            "recommendation": "Slow down and add a short pause before the next key statement."
        },
        {
            "id": 2,
            "start": 31.2,
            "end": 33.5,
            "type": "LONG_PAUSE",
            "severity": "MEDIUM",
            "confidence": 0.87,
            "measured": 2.3,
            "reference": 1.0,
            "explanation": "A longer-than-expected pause occurs in this section.",
            "recommendation": "Practice the transition between these sentences."
        },
        {
            "id": 3,
            "start": 45.0,
            "end": 58.0,
            "type": "MONOTONE",
            "severity": "MEDIUM",
            "confidence": 0.84,
            "measured": 12.0,
            "reference": 25.0,
            "explanation": "Pitch variation is relatively low in this section.",
            "recommendation": "Use more natural pitch variation to emphasize important points."
        }
    ],
    "features": {
        "speech_rate": {
            "average_wpm": 158.0,
            "reference_wpm": 145.0
        },
        "pitch": {
            "mean_f0": 185.0,
            "pitch_variance": 18.0
        },
        "pauses": {
            "count": 6,
            "average_duration": 0.8,
            "longest_duration": 2.3
        },
        "energy": {
            "average": 0.62
        }
    }
}

@router.get("/result/{id}", response_model=AnalysisResultResponse)
async def get_analysis_result(id: str):
    """
    Day 1 Mock Result Endpoint.
    Returns realistic diagnostic result for the given analysis ID.
    """
    result = dict(MOCK_RESULT)
    result["analysis_id"] = id
    return result

@router.get("/results/{id}", response_model=AnalysisResultResponse, include_in_schema=False)
async def get_analysis_result_plural(id: str):
    """Plural alias for convenience."""
    return await get_analysis_result(id)

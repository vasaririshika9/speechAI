"""Backend API unit tests for Day 1."""
import pytest
from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)

def test_health_endpoint():
    response = client.get("/health")
    assert response.status_code == 200
    data = response.json()
    assert data["status"] == "ok"
    assert "Speech Diagnosis backend is running" in data["message"]

def test_analyze_endpoint():
    response = client.post("/analyze")
    assert response.status_code == 200
    data = response.json()
    assert data["analysis_id"] == "demo-001"
    assert data["status"] == "processing"

def test_result_endpoint():
    response = client.get("/result/demo-001")
    assert response.status_code == 200
    data = response.json()
    assert data["analysis_id"] == "demo-001"
    assert data["status"] == "completed"
    assert data["overall_score"] == 78
    assert "category_scores" in data
    assert "segments" in data
    assert len(data["segments"]) == 3
    assert "features" in data

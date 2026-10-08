# SPEECH DIAGNOSIS
### Contrastive Speech Analytics & Temporal Flaw Grounding (Day 1 Prototype)

---

## 1. Project Overview

**Speech Diagnosis** is an AI-powered speech analytics platform designed to move beyond generic, high-level presentation scores. Rather than providing an arbitrary number, Speech Diagnosis identifies delivery anomalies, pinpoints where they occur in the timeline, explains why they degrade listener comprehension, and provides actionable recommendations to improve.

### The Problem
Traditional speech scoring tools generate a broad score (e.g., "75/100") without actionable grounding. Speakers are left wondering:
- What specifically went wrong?
- At which exact seconds did the flaw take place?
- Why is it an issue for the audience?
- How can they adjust their vocal delivery?

### The Solution Concept
Speech Diagnosis compares a speaker's audio against contrastive reference benchmarks and breaks down each diagnostic finding across four pillars:
1. **WHAT**: Identifies the flaw (e.g., *Too Fast*, *Long Pause*, *Monotone*, *Low Energy*).
2. **WHERE**: Grounds the flaw to sub-second timestamps (e.g., `12.4s – 16.1s`).
3. **WHY**: Explains the psychoacoustic impact on listener attention and retention.
4. **HOW**: Outlines clear, practical drills and adjustments to correct delivery.

> **Note on Day 1 Scope:** Day 1 delivers the verified architectural foundation, mock contract API, and responsive UI. Heavy ML models (Whisper, librosa, Parselmouth, wav2vec 2.0) are architected and will be integrated in subsequent phases.

---

## 2. Tech Stack

- **Backend:**
  - Python 3.11+
  - FastAPI
  - Uvicorn
  - Pydantic v2
  - SQLAlchemy
  - python-dotenv
  - SQLite
- **Frontend:**
  - React 18
  - Vite
  - Tailwind CSS
  - WaveSurfer.js
  - Recharts
  - Axios
  - Lucide React

---

## 3. Project Structure

```
speechAI/
│
├── README.md
├── docker-compose.yml
│
├── data/
│   ├── scripts/
│   ├── recordings/
│   │   ├── ideal/
│   │   ├── slight/
│   │   ├── moderate/
│   │   └── severe/
│   └── annotations.csv
│
├── backend/
│   ├── requirements.txt
│   ├── .env.example
│   ├── .env
│   └── app/
│       ├── __init__.py
│       ├── main.py
│       │
│       ├── api/
│       │   ├── __init__.py
│       │   ├── analyze.py
│       │   └── results.py
│       │
│       ├── core/
│       │   ├── __init__.py
│       │   ├── config.py
│       │   └── audio.py
│       │
│       ├── pipeline/
│       │   ├── __init__.py
│       │   ├── transcribe.py
│       │   ├── features.py
│       │   ├── detector.py
│       │   ├── segments.py
│       │   └── explain.py
│       │
│       ├── models/
│       │   ├── __init__.py
│       │   ├── database.py
│       │   └── schemas.py
│       │
│       └── tests/
│           ├── __init__.py
│           └── test_api.py
│
├── ml/
│   ├── make_flawed_audio.py
│   ├── train.py
│   ├── evaluate.py
│   └── notebooks/
│
└── frontend/
    ├── package.json
    ├── .env.example
    ├── .env
    ├── vite.config.js
    ├── tailwind.config.js
    └── src/
        ├── main.jsx
        ├── App.jsx
        ├── index.css
        │
        ├── api/
        │   └── client.js
        │
        ├── pages/
        │   ├── Landing.jsx
        │   ├── Analyze.jsx
        │   ├── Results.jsx
        │   └── About.jsx
        │
        ├── components/
        │   ├── UploadRecorder.jsx
        │   ├── Waveform.jsx
        │   ├── SegmentList.jsx
        │   ├── SegmentDetail.jsx
        │   ├── FeatureCharts.jsx
        │   └── ProgressStatus.jsx
        │
        └── mock/
            └── result.json
```

---

## 4. Prerequisites

- **Python:** Version 3.11 or higher
- **Node.js:** Version 18.0 or higher
- **npm:** Version 9.0 or higher
- **Git**

---

## 5. Backend Setup & Run Instructions

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Create a virtual environment:
   ```bash
   python -m venv venv
   ```

3. Activate the virtual environment:
   - **Windows (PowerShell / Command Prompt):**
     ```powershell
     .\venv\Scripts\activate
     ```
   - **Linux / macOS:**
     ```bash
     source venv/bin/activate
     ```

4. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

5. Run the FastAPI application:
   ```bash
   uvicorn app.main:app --reload --port 8000
   ```

### Backend Endpoints:
- **Base URL:** `http://localhost:8000`
- **Interactive API Documentation:** `http://localhost:8000/docs`
- **Health Check:** `GET http://localhost:8000/health`
- **Speech Analyze Contract:** `POST http://localhost:8000/analyze`
- **Speech Result Contract:** `GET http://localhost:8000/result/{id}`

---

## 6. Frontend Setup & Run Instructions

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

- **Frontend Application URL:** `http://localhost:5173`

---

## 7. Color & Theme Customization

All primary, surface, text, and flaw severity colors are centralized in `frontend/src/index.css`:

```css
/*
  CUSTOMIZE COLORS HERE
  Change the variables below to change the overall application theme.
*/
:root {
  --color-primary: #3b82f6;
  --color-secondary: #6366f1;
  --color-background: #0f172a;
  --color-surface: #1e293b;
  --color-text: #f8fafc;
  --color-muted: #94a3b8;
  --color-success: #10b981;
  --color-warning: #f59e0b;
  --color-danger: #ef4444;

  --severity-low: #38bdf8;
  --severity-medium: #fbbf24;
  --severity-high: #f87171;
}
```

Updating these values instantly re-themes the entire application.

---

## 8. Docker Support (Preview)

A starter `docker-compose.yml` is provided at the repository root. Full production containerization will be finalized in upcoming phases.

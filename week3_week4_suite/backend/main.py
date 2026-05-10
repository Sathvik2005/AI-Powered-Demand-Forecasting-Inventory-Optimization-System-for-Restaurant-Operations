from __future__ import annotations

from pathlib import Path

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from fastapi.responses import FileResponse
from fastapi.staticfiles import StaticFiles

from week3_week4_suite.shared import build_dashboard_payload, generate_artifacts

BASE_DIR = Path(__file__).resolve().parent
ARTIFACT_DIR = BASE_DIR.parent / 'artifacts'
ARTIFACT_DIR.mkdir(parents=True, exist_ok=True)

app = FastAPI(title='Food Demand Forecasting API', version='1.0.0')
app.add_middleware(
    CORSMiddleware,
    allow_origins=['*'],
    allow_credentials=True,
    allow_methods=['*'],
    allow_headers=['*'],
)

app.mount('/artifacts', StaticFiles(directory=ARTIFACT_DIR), name='artifacts')


@app.get('/api/health')
def health() -> dict[str, str]:
    return {'status': 'ok'}


@app.get('/api/summary')
def summary() -> dict:
    return build_dashboard_payload()


@app.get('/api/forecast')
def forecast() -> list[dict]:
    return build_dashboard_payload()['forecast']


@app.get('/api/feature-importance')
def feature_importance() -> list[dict]:
    return build_dashboard_payload()['feature_importance']


@app.get('/api/model-comparison')
def model_comparison() -> list[dict]:
    return build_dashboard_payload()['comparison']


@app.get('/api/report-artifacts')
def report_artifacts() -> dict[str, str]:
    artifacts = generate_artifacts(ARTIFACT_DIR)
    return {name: f'/artifacts/{path.name}' for name, path in artifacts.items()}


@app.get('/api/insights')
def insights() -> dict:
    return build_dashboard_payload()['insights']


@app.get('/')
def root():
    index_file = BASE_DIR.parent / 'frontend' / 'dist' / 'index.html'
    if index_file.exists():
        return FileResponse(index_file)
    return JSONResponse(
        {
            'message': 'Frontend build not found. Run the React app build first.',
            'hint': 'cd week3_week4_suite/frontend && npm install && npm run build',
        }
    )

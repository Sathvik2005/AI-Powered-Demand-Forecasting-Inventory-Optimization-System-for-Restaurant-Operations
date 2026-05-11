from __future__ import annotations

import sys
from pathlib import Path

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse, JSONResponse
from fastapi.staticfiles import StaticFiles

BASE_DIR = Path(__file__).resolve().parent
# Add the project root to the Python path to allow imports from 'week3_week4_suite'
sys.path.insert(0, str(BASE_DIR.parents[1]))

from week3_week4_suite.shared import build_dashboard_payload, generate_artifacts

ARTIFACT_DIR = BASE_DIR.parent / 'artifacts'
ARTIFACT_DIR.mkdir(parents=True, exist_ok=True)

FRONTEND_DIR = BASE_DIR.parent / 'frontend' / 'dist'

app = FastAPI(title='Food Demand Forecasting API', version='1.0.0')
app.add_middleware(
    CORSMiddleware,
    allow_origins=['*'],
    allow_credentials=True,
    allow_methods=['*'],
    allow_headers=['*'],
)


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


# Mount artifacts directory for serving generated files
app.mount('/artifacts', StaticFiles(directory=ARTIFACT_DIR), name='artifacts')

# Mount static files from the frontend dist directory
if FRONTEND_DIR.exists():
    app.mount('/static', StaticFiles(directory=FRONTEND_DIR, html=False), name='frontend_static')


# Catch-all route for serving index.html (for SPA routing)
@app.get('/')
async def serve_root():
    """Serve index.html for the root path."""
    index_file = FRONTEND_DIR / 'index.html'
    if index_file.exists():
        return FileResponse(index_file)
    return JSONResponse({'error': 'Frontend not found'}, status_code=404)


# Fallback route for undefined paths (serves index.html for SPA)
@app.api_route('/{full_path:path}', methods=['GET'])
async def serve_spa(full_path: str):
    """Serve frontend files or index.html for SPA routing."""
    # Don't serve API routes or artifacts through this handler
    if full_path.startswith('api/') or full_path.startswith('artifacts/'):
        return JSONResponse({'error': 'Not found'}, status_code=404)
    
    file_path = FRONTEND_DIR / full_path
    
    # If it's a file that exists, serve it
    if file_path.is_file():
        return FileResponse(file_path)
    
    # Otherwise, serve index.html for SPA routing
    index_file = FRONTEND_DIR / 'index.html'
    if index_file.exists():
        return FileResponse(index_file)
    
    return JSONResponse({'error': 'Not found'}, status_code=404)

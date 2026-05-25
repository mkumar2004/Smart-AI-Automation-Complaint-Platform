"""
Smart AI Automation Complaint Platform — Python LangChain service.
Run from this folder: python -m uvicorn main:app --reload --port 8000
"""

import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent
if str(ROOT) not in sys.path:
    sys.path.insert(0, str(ROOT))

from dotenv import load_dotenv
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from api.routes import router
from config.settings import settings

load_dotenv(ROOT / ".env")

app = FastAPI(
    title="Smart AI Automation Complaint Platform — AI",
    description="LangChain-powered complaint analysis microservice",
    version="1.0.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(router)


@app.get("/")
def root():
    return {
        "service": "ai",
        "docs": "/docs",
        "health": "/api/v1/health",
    }


if __name__ == "__main__":
    import uvicorn

    uvicorn.run(
        "main:app",
        host=settings.ai_host,
        port=settings.ai_port,
        reload=True,
    )

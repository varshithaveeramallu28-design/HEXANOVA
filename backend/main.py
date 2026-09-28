import time
from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware

from config import settings
from services.nvidia_nim import nvidia_nim
from services.hindsight_memory import hindsight_memory

from routers import (
    auth,
    meetings,
    transcripts,
    ai,
    tasks,
    decisions,
    memory,
    analytics,
    notifications
)

app = FastAPI(
    title="AI Meeting Intelligence API",
    description="Production-grade AI SaaS backend for Meeting Intelligence, NVIDIA NIM Analysis, and Hindsight Memory.",
    version="1.0.0"
)

# CORS Configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Latency Performance Tracking Middleware
@app.middleware("http")
async def add_process_time_header(request: Request, call_next):
    start_time = time.time()
    response = await call_next(request)
    process_time = (time.time() - start_time) * 1000  # ms
    response.headers["X-Process-Time"] = f"{process_time:.2f}ms"
    return response

# Mount Routers
app.include_router(auth.router)
app.include_router(meetings.router)
app.include_router(transcripts.router)
app.include_router(ai.router)
app.include_router(tasks.router)
app.include_router(decisions.router)
app.include_router(memory.router)
app.include_router(analytics.router)
app.include_router(notifications.router)

@app.get("/")
def root():
    return {
        "status": "online",
        "service": "AI Meeting Intelligence Platform",
        "version": "1.0.0",
        "docs_url": "/docs"
    }

@app.get("/api/health")
def health_check():
    return {
        "status": "healthy",
        "backend": "FastAPI (Python)",
        "ai_engine": {
            "provider": "NVIDIA NIM",
            "model": settings.NVIDIA_NIM_MODEL,
            "configured": nvidia_nim.is_configured()
        },
        "hindsight_memory": {
            "status": "active",
            "search_ready": True
        },
        "database": {
            "type": "Supabase PostgreSQL",
            "configured": bool(settings.SUPABASE_URL)
        }
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host=settings.HOST, port=settings.PORT, reload=settings.DEBUG)

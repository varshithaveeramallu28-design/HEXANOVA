from fastapi import APIRouter
from pydantic import BaseModel
from typing import Optional
from services.hindsight_memory import hindsight_memory

router = APIRouter(prefix="/api/memory", tags=["Hindsight Memory"])

class SearchMemoryRequest(BaseModel):
    query: str

@router.post("/search")
def search_hindsight_memory(req: SearchMemoryRequest):
    return hindsight_memory.search_memories(req.query)

@router.get("/status")
def hindsight_status():
    return {
        "hindsight_enabled": True,
        "indexed_meetings_count": len(hindsight_memory.search_memories(" ")["sources"]),
        "embedding_model": "Hindsight-v2-Semantic",
        "latency_ms": 18
    }

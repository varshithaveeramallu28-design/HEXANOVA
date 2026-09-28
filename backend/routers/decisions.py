from fastapi import APIRouter
from typing import List, Dict, Any, Optional
from services.database import db

router = APIRouter(prefix="/api/decisions", tags=["Decisions"])

@router.get("")
def get_decisions(topic: Optional[str] = None):
    decisions = db.get_all_decisions()
    if topic:
        decisions = [d for d in decisions if d.get("topic", "").lower() == topic.lower()]
    return decisions

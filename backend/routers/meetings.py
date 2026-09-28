from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import Optional, List, Dict, Any
from services.database import db

router = APIRouter(prefix="/api/meetings", tags=["Meetings"])

class CreateMeetingRequest(BaseModel):
    title: str
    description: Optional[str] = ""
    date: str
    start_time: str
    end_time: str
    platform: Optional[str] = "Google Meet"
    meeting_url: Optional[str] = ""
    google_meet_url: Optional[str] = ""
    zoom_url: Optional[str] = ""
    youtube_url: Optional[str] = ""
    participants: Optional[List[str]] = []
    transcript: Optional[str] = ""

class UpdateMeetingRequest(BaseModel):
    title: Optional[str] = None
    description: Optional[str] = None
    date: Optional[str] = None
    start_time: Optional[str] = None
    end_time: Optional[str] = None
    platform: Optional[str] = None
    google_meet_url: Optional[str] = None
    zoom_url: Optional[str] = None
    youtube_url: Optional[str] = None
    status: Optional[str] = None
    transcript: Optional[str] = None

class CompareMeetingsRequest(BaseModel):
    meeting_id_1: str
    meeting_id_2: str

@router.get("")
def list_meetings():
    return db.get_meetings()

@router.get("/{meeting_id}")
def get_meeting(meeting_id: str):
    m = db.get_meeting_by_id(meeting_id)
    if not m:
        raise HTTPException(status_code=404, detail="Meeting not found")
    return m

@router.post("")
def create_meeting(req: CreateMeetingRequest):
    new_m = db.create_meeting(req.dict())
    return new_m

@router.put("/{meeting_id}")
def update_meeting(meeting_id: str, req: UpdateMeetingRequest):
    updates = {k: v for k, v in req.dict().items() if v is not None}
    updated_m = db.update_meeting(meeting_id, updates)
    if not updated_m:
        raise HTTPException(status_code=404, detail="Meeting not found")
    return updated_m

@router.delete("/{meeting_id}")
def delete_meeting(meeting_id: str):
    success = db.delete_meeting(meeting_id)
    if not success:
        raise HTTPException(status_code=404, detail="Meeting not found")
    return {"message": "Meeting deleted successfully"}

@router.post("/compare")
def compare_meetings(req: CompareMeetingsRequest):
    m1 = db.get_meeting_by_id(req.meeting_id_1)
    m2 = db.get_meeting_by_id(req.meeting_id_2)
    if not m1 or not m2:
        raise HTTPException(status_code=404, detail="One or both meetings not found")
    
    t1_topics = m1.get("summary", {}).get("key_topics", []) if m1.get("summary") else []
    t2_topics = m2.get("summary", {}).get("key_topics", []) if m2.get("summary") else []
    common_topics = list(set(t1_topics).intersection(set(t2_topics)))
    
    return {
        "meeting_1": {"id": m1["id"], "title": m1["title"], "date": m1["date"], "decisions_count": len(m1.get("decisions", []))},
        "meeting_2": {"id": m2["id"], "title": m2["title"], "date": m2["date"], "decisions_count": len(m2.get("decisions", []))},
        "comparison_summary": f"Comparison between '{m1['title']}' and '{m2['title']}'.",
        "common_topics": common_topics,
        "delta_decisions": len(m2.get("decisions", [])) - len(m1.get("decisions", []))
    }

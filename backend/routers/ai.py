from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import Optional, List, Dict, Any
from services.nvidia_nim import nvidia_nim
from services.hindsight_memory import hindsight_memory
from services.database import db

router = APIRouter(prefix="/api/ai", tags=["AI Engine"])

class AnalyzeMeetingRequest(BaseModel):
    meeting_id: str

class AgendaRequest(BaseModel):
    title: str
    description: Optional[str] = ""
    participants: Optional[List[str]] = []

class FollowUpRequest(BaseModel):
    meeting_id: str

class AskAIRequest(BaseModel):
    question: str
    meeting_id: Optional[str] = None

@router.post("/analyze")
def analyze_meeting(req: AnalyzeMeetingRequest):
    meeting = db.get_meeting_by_id(req.meeting_id)
    if not meeting:
        raise HTTPException(status_code=404, detail="Meeting not found")
    
    transcript = meeting.get("transcript", "")
    if not transcript or len(transcript.strip()) < 10:
        raise HTTPException(status_code=400, detail="Transcript is empty or too short for AI analysis.")

    # Call NVIDIA NIM Service
    analysis_result = nvidia_nim.analyze_transcript(meeting["title"], transcript)

    summary_data = {
        "summary_text": analysis_result.get("summary_text", "Meeting summary generated."),
        "key_topics": analysis_result.get("key_topics", []),
        "participants_mentioned": analysis_result.get("participants_mentioned", [])
    }
    decisions = analysis_result.get("decisions", [])
    action_items = analysis_result.get("action_items", [])

    # Update Database Store
    db.update_meeting_summary(req.meeting_id, summary_data, decisions, action_items)

    return {
        "meeting_id": req.meeting_id,
        "summary": summary_data,
        "decisions": decisions,
        "action_items": action_items,
        "status": "completed"
    }

@router.post("/agenda")
def generate_agenda(req: AgendaRequest):
    agenda = nvidia_nim.generate_agenda(req.title, req.description or "", req.participants or [])
    return agenda

@router.post("/follow-up")
def generate_follow_up(req: FollowUpRequest):
    meeting = db.get_meeting_by_id(req.meeting_id)
    if not meeting:
        raise HTTPException(status_code=404, detail="Meeting not found")

    summary_text = meeting.get("summary", {}).get("summary_text", meeting.get("description", "No summary available.")) if meeting.get("summary") else meeting.get("description", "")
    decisions = meeting.get("decisions", [])
    tasks = meeting.get("action_items", [])

    email_body = nvidia_nim.generate_follow_up(meeting["title"], summary_text, decisions, tasks)
    return {
        "meeting_id": req.meeting_id,
        "meeting_title": meeting["title"],
        "email_subject": f"Meeting Follow-up & Action Items: {meeting['title']}",
        "email_body": email_body
    }

@router.post("/ask")
def ask_ai(req: AskAIRequest):
    # Delegate to Hindsight Memory for grounded answer with source citations
    result = hindsight_memory.search_memories(req.question)
    return result

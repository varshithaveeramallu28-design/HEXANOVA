from fastapi import APIRouter, HTTPException, UploadFile, File, Form
from typing import Optional
from services.database import db

router = APIRouter(prefix="/api/transcripts", tags=["Transcripts"])

@router.post("/upload")
async def upload_transcript(meeting_id: str = Form(...), file: UploadFile = File(...)):
    filename = file.filename.lower()
    content_bytes = await file.read()
    
    try:
        if filename.endswith(".txt") or filename.endswith(".srt"):
            transcript_text = content_bytes.decode("utf-8", errors="ignore")
        elif filename.endswith(".docx"):
            # Simple fallback for docx plain text extraction
            transcript_text = content_bytes.decode("latin-1", errors="ignore")
        else:
            transcript_text = content_bytes.decode("utf-8", errors="ignore")
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Failed to read file transcript: {str(e)}")

    meeting = db.get_meeting_by_id(meeting_id)
    if not meeting:
        raise HTTPException(status_code=404, detail="Meeting not found")

    db.update_meeting(meeting_id, {"transcript": transcript_text})
    return {"message": "Transcript uploaded successfully", "meeting_id": meeting_id, "character_count": len(transcript_text)}

@router.post("/paste")
def paste_transcript(meeting_id: str, transcript: str):
    meeting = db.get_meeting_by_id(meeting_id)
    if not meeting:
        raise HTTPException(status_code=404, detail="Meeting not found")

    db.update_meeting(meeting_id, {"transcript": transcript})
    return {"message": "Transcript updated successfully", "meeting_id": meeting_id}

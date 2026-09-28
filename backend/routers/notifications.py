from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import Optional
from services.database import db

router = APIRouter(prefix="/api/notifications", tags=["Notifications"])

class PreferencesRequest(BaseModel):
    email_notifications: Optional[bool] = True
    meeting_reminders: Optional[bool] = True
    task_due_reminders: Optional[bool] = True
    ai_summary_notifications: Optional[bool] = True
    decision_alerts: Optional[bool] = True

@router.get("")
def list_notifications():
    notes = db.get_notifications()
    unread_count = len([n for n in notes if not n["is_read"]])
    return {"notifications": notes, "unread_count": unread_count}

@router.put("/{notification_id}/read")
def mark_read(notification_id: str):
    success = db.mark_notification_read(notification_id)
    if not success:
        raise HTTPException(status_code=404, detail="Notification not found")
    return {"message": "Notification marked as read"}

@router.post("/read-all")
def mark_all_read():
    db.mark_all_notifications_read()
    return {"message": "All notifications marked as read"}

@router.get("/preferences")
def get_preferences():
    return {
        "email_notifications": True,
        "meeting_reminders": True,
        "task_due_reminders": True,
        "ai_summary_notifications": True,
        "decision_alerts": True,
        "in_app_notifications": True
    }

@router.put("/preferences")
def update_preferences(req: PreferencesRequest):
    return {"message": "Notification preferences updated successfully", "preferences": req.dict()}

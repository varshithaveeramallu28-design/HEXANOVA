from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import Optional, List, Dict, Any
from services.database import db

router = APIRouter(prefix="/api/tasks", tags=["Tasks"])

class UpdateTaskStatusRequest(BaseModel):
    status: str  # Todo, In Progress, Done

@router.get("")
def get_all_tasks():
    tasks = db.get_all_tasks()
    # Annotate overdue status
    from datetime import date
    today_str = date.today().isoformat()
    for t in tasks:
        if t.get("due_date") and t["due_date"] < today_str and t.get("status") != "Done":
            t["is_overdue"] = True
        else:
            t["is_overdue"] = False
    return tasks

@router.put("/{task_id}/status")
def update_task_status(task_id: str, req: UpdateTaskStatusRequest):
    if req.status not in ["Todo", "In Progress", "Done"]:
        raise HTTPException(status_code=400, detail="Invalid status value. Must be 'Todo', 'In Progress', or 'Done'.")
    
    success = db.update_task_status(task_id, req.status)
    if not success:
        raise HTTPException(status_code=404, detail="Task not found")
    return {"message": "Task status updated successfully", "task_id": task_id, "new_status": req.status}

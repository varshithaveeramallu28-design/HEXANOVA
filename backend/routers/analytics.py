from fastapi import APIRouter
from services.database import db

router = APIRouter(prefix="/api/analytics", tags=["Analytics"])

@router.get("")
def get_analytics():
    meetings = db.get_meetings()
    tasks = db.get_all_tasks()
    decisions = db.get_all_decisions()

    total_meetings = len(meetings)
    completed_meetings = len([m for m in meetings if m["status"] == "Completed"])
    upcoming_meetings = len([m for m in meetings if m["status"] == "Scheduled"])

    done_tasks = len([t for t in tasks if t.get("status") == "Done"])
    in_progress_tasks = len([t for t in tasks if t.get("status") == "In Progress"])
    todo_tasks = len([t for t in tasks if t.get("status") == "Todo"])
    overdue_tasks = len([t for t in tasks if t.get("is_overdue", False)])

    return {
        "kpis": {
            "total_meetings": total_meetings,
            "completed_meetings": completed_meetings,
            "upcoming_meetings": upcoming_meetings,
            "total_decisions": len(decisions),
            "total_tasks": len(tasks),
            "done_tasks": done_tasks,
            "pending_tasks": todo_tasks + in_progress_tasks,
            "overdue_tasks": overdue_tasks,
            "meeting_hours": round(total_meetings * 1.25, 1)
        },
        "charts": {
            "meeting_trends": [
                {"day": "Mon", "meetings": 2, "hours": 2.5},
                {"day": "Tue", "meetings": 4, "hours": 4.0},
                {"day": "Wed", "meetings": 3, "hours": 3.0},
                {"day": "Thu", "meetings": 5, "hours": 5.5},
                {"day": "Fri", "meetings": 2, "hours": 2.0}
            ],
            "task_distribution": [
                {"name": "Done", "value": done_tasks or 1},
                {"name": "In Progress", "value": in_progress_tasks or 1},
                {"name": "Todo", "value": todo_tasks or 2}
            ],
            "decision_velocity": [
                {"week": "Week 1", "decisions": 3},
                {"week": "Week 2", "decisions": 5},
                {"week": "Week 3", "decisions": 4},
                {"week": "Week 4", "decisions": 6}
            ]
        }
    }

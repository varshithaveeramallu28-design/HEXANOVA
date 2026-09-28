import uuid
from datetime import datetime, date
from typing import List, Dict, Any, Optional
from config import settings

# In-Memory / Local Storage Fallback Engine for instantaneous zero-latency execution
DEMO_MEETINGS: List[Dict[str, Any]] = [
    {
        "id": "m1-engineering-sync",
        "user_id": "demo-user-123",
        "title": "Weekly Engineering Sync & OAuth Migration",
        "description": "Discussion on OAuth 2.0 implementation, Supabase RLS policies, and upcoming Q4 deliverables.",
        "date": "2026-09-28",
        "start_time": "10:00:00",
        "end_time": "11:00:00",
        "platform": "Google Meet",
        "meeting_url": "https://meet.google.com/abc-defg-hij",
        "google_meet_url": "https://meet.google.com/abc-defg-hij",
        "zoom_url": "",
        "youtube_url": "",
        "status": "Completed",
        "participants": ["Rahul Sharma (Lead)", "Priya Verma (Backend)", "Alex Chen (Frontend)", "Sarah Jenkins (PM)"],
        "transcript": """Rahul: Good morning team. Let's start with our agenda today: OAuth 2.0 migration and Supabase database optimization.
Priya: I've benchmarked our current auth flow. Switching to OAuth 2.0 with Supabase Auth will reduce login latency by 40%.
Alex: On the frontend, we are standardizing on HSL color tokens for dark/light mode switching.
Sarah: What about the security review?
Rahul: We decided to enforce strict Supabase RLS policies across all tables before deploying to staging.
Priya: I will take the action item to complete RLS migration by Friday, Oct 2nd.
Alex: I will update the tasks Kanban board with real-time status notifications.
Sarah: Great. Let's make sure we document all decisions in the Hindsight Memory store.""",
        "summary": {
            "summary_text": "The engineering team reviewed the OAuth 2.0 migration plan, agreed on implementing Supabase RLS security policies, and updated the design system tokens for dark/light theme support.",
            "key_topics": ["OAuth 2.0 Authentication", "Supabase RLS Policies", "Frontend HSL Theme Design System", "Security Audit"],
            "participants_mentioned": ["Rahul Sharma", "Priya Verma", "Alex Chen", "Sarah Jenkins"]
        },
        "decisions": [
            {
                "id": "d1",
                "decision_text": "Use OAuth 2.0 with Supabase Auth for unified authentication across all platform services.",
                "topic": "Authentication",
                "owner": "Priya Verma",
                "status": "Final",
                "date": "2026-09-28"
            },
            {
                "id": "d2",
                "decision_text": "Enforce strict Row-Level Security (RLS) policies on all PostgreSQL database tables before staging release.",
                "topic": "Security",
                "owner": "Rahul Sharma",
                "status": "Final",
                "date": "2026-09-28"
            }
        ],
        "action_items": [
            {
                "id": "t1",
                "title": "Complete Supabase RLS Policies Migration",
                "description": "Apply script to meetings, decisions, and action_items tables.",
                "assignee": "Priya Verma",
                "due_date": "2026-10-02",
                "priority": "High",
                "status": "In Progress"
            },
            {
                "id": "t2",
                "title": "Implement HSL CSS Tokens for Theme Toggle",
                "description": "Ensure seamless switching between deep navy dark mode and clean light mode.",
                "assignee": "Alex Chen",
                "due_date": "2026-09-30",
                "priority": "Medium",
                "status": "Done"
            }
        ]
    },
    {
        "id": "m2-sprint-planning",
        "user_id": "demo-user-123",
        "title": "Sprint Planning & AI Architecture Review",
        "description": "Sprint planning session covering NVIDIA NIM API integration and Hindsight Memory vector search.",
        "date": "2026-09-25",
        "start_time": "14:00:00",
        "end_time": "15:30:00",
        "platform": "Zoom",
        "meeting_url": "https://zoom.us/j/9876543210",
        "google_meet_url": "",
        "zoom_url": "https://zoom.us/j/9876543210",
        "youtube_url": "",
        "status": "Completed",
        "participants": ["Rahul Sharma", "Dev Patel (AI Specialist)", "Sarah Jenkins"],
        "transcript": """Sarah: Welcome everyone. Today we are setting sprint targets for AI Meeting Intelligence.
Dev: For AI summaries and action item extraction, we are standardizing on NVIDIA NIM microservices with meta/llama-3.1-70b-instruct.
Rahul: How is the Hindsight Memory component performing?
Dev: Hindsight Memory uses cross-meeting vector embeddings to answer natural language questions with source citations. It accounts for ~25% of the overall intelligence pipeline.
Sarah: Decision made: We will set a 1-second target response time for standard UI endpoints and stream NVIDIA NIM responses when processing large transcripts.""",
        "summary": {
            "summary_text": "Agreed on NVIDIA NIM microservices integration and finalized the Hindsight Memory architecture for cross-meeting Q&A.",
            "key_topics": ["NVIDIA NIM Microservices", "Hindsight Memory Search", "Performance Optimization"],
            "participants_mentioned": ["Rahul Sharma", "Dev Patel", "Sarah Jenkins"]
        },
        "decisions": [
            {
                "id": "d3",
                "decision_text": "Adopt NVIDIA NIM meta/llama-3.1-70b-instruct model as default LLM provider for fast structured extraction.",
                "topic": "AI Infrastructure",
                "owner": "Dev Patel",
                "status": "Final",
                "date": "2026-09-25"
            }
        ],
        "action_items": [
            {
                "id": "t3",
                "title": "Configure NVIDIA NIM API Key Environment Variables",
                "description": "Set up secure API key routing in backend config without exposing credentials to frontend.",
                "assignee": "Dev Patel",
                "due_date": "2026-09-29",
                "priority": "High",
                "status": "Todo"
            }
        ]
    },
    {
        "id": "m3-client-review",
        "user_id": "demo-user-123",
        "title": "Client Product Review & UX Feedback",
        "description": "Reviewing upcoming dashboard widgets, calendar integrations, and automated email follow-up templates.",
        "date": "2026-09-29",
        "start_time": "11:30:00",
        "end_time": "12:30:00",
        "platform": "YouTube",
        "meeting_url": "https://youtube.com/watch?v=demo123",
        "google_meet_url": "",
        "zoom_url": "",
        "youtube_url": "https://youtube.com/watch?v=demo123",
        "status": "Scheduled",
        "participants": ["Rahul Sharma", "Client Stakeholder (Emily)", "Alex Chen"],
        "transcript": "Upcoming live presentation of the AI Meeting Workspace.",
        "summary": {
            "summary_text": "Pre-meeting scheduled for demo presentation of automated email follow-ups and analytics charts.",
            "key_topics": ["Client UX Review", "Follow-up Email Templates", "Dashboard Analytics"],
            "participants_mentioned": ["Rahul Sharma", "Emily", "Alex Chen"]
        },
        "decisions": [],
        "action_items": [
            {
                "id": "t4",
                "title": "Prepare Interactive Product Preview Slides",
                "description": "Highlight NVIDIA NIM speed, Hindsight Memory Q&A, and task tracking board.",
                "assignee": "Rahul Sharma",
                "due_date": "2026-09-29",
                "priority": "Medium",
                "status": "Todo"
            }
        ]
    }
]

DEMO_NOTIFICATIONS: List[Dict[str, Any]] = [
    {
        "id": "n1",
        "user_id": "demo-user-123",
        "title": "Meeting Starting Soon",
        "message": "Client Product Review starts in 30 minutes.",
        "type": "reminder",
        "is_read": False,
        "created_at": "2026-09-28T11:00:00Z"
    },
    {
        "id": "n2",
        "user_id": "demo-user-123",
        "title": "AI Summary Ready",
        "message": "NVIDIA NIM finished analyzing Weekly Engineering Sync.",
        "type": "summary",
        "is_read": False,
        "created_at": "2026-09-28T10:30:00Z"
    },
    {
        "id": "n3",
        "user_id": "demo-user-123",
        "title": "New Task Assigned",
        "message": "You were assigned 'Complete Supabase RLS Policies Migration'.",
        "type": "task",
        "is_read": True,
        "created_at": "2026-09-28T09:15:00Z"
    }
]

class DatabaseService:
    def __init__(self):
        self.meetings = DEMO_MEETINGS
        self.notifications = DEMO_NOTIFICATIONS

    def get_meetings(self) -> List[Dict[str, Any]]:
        return self.meetings

    def get_meeting_by_id(self, meeting_id: str) -> Optional[Dict[str, Any]]:
        for m in self.meetings:
            if m["id"] == meeting_id:
                return m
        return None

    def create_meeting(self, meeting_data: Dict[str, Any]) -> Dict[str, Any]:
        meeting_id = f"m-{uuid.uuid4().hex[:8]}"
        new_meeting = {
            "id": meeting_id,
            "user_id": meeting_data.get("user_id", "demo-user-123"),
            "title": meeting_data.get("title", "Untitled Meeting"),
            "description": meeting_data.get("description", ""),
            "date": str(meeting_data.get("date", date.today().isoformat())),
            "start_time": meeting_data.get("start_time", "09:00:00"),
            "end_time": meeting_data.get("end_time", "10:00:00"),
            "platform": meeting_data.get("platform", "Google Meet"),
            "meeting_url": meeting_data.get("meeting_url", ""),
            "google_meet_url": meeting_data.get("google_meet_url", ""),
            "zoom_url": meeting_data.get("zoom_url", ""),
            "youtube_url": meeting_data.get("youtube_url", ""),
            "status": "Scheduled",
            "participants": meeting_data.get("participants", ["Host"]),
            "transcript": meeting_data.get("transcript", ""),
            "summary": None,
            "decisions": [],
            "action_items": []
        }
        self.meetings.insert(0, new_meeting)
        return new_meeting

    def update_meeting(self, meeting_id: str, updates: Dict[str, Any]) -> Optional[Dict[str, Any]]:
        meeting = self.get_meeting_by_id(meeting_id)
        if not meeting:
            return None
        meeting.update(updates)
        return meeting

    def delete_meeting(self, meeting_id: str) -> bool:
        initial_len = len(self.meetings)
        self.meetings = [m for m in self.meetings if m["id"] != meeting_id]
        return len(self.meetings) < initial_len

    def update_meeting_summary(self, meeting_id: str, summary_data: Dict[str, Any], decisions: List[Dict[str, Any]], action_items: List[Dict[str, Any]]):
        meeting = self.get_meeting_by_id(meeting_id)
        if meeting:
            meeting["summary"] = summary_data
            meeting["decisions"] = decisions
            meeting["action_items"] = action_items
            meeting["status"] = "Completed"

    def get_all_decisions(self) -> List[Dict[str, Any]]:
        all_decisions = []
        for m in self.meetings:
            for d in m.get("decisions", []):
                decision_copy = dict(d)
                decision_copy["source_meeting_id"] = m["id"]
                decision_copy["source_meeting_title"] = m["title"]
                all_decisions.append(decision_copy)
        return all_decisions

    def get_all_tasks(self) -> List[Dict[str, Any]]:
        all_tasks = []
        for m in self.meetings:
            for t in m.get("action_items", []):
                task_copy = dict(t)
                task_copy["source_meeting_id"] = m["id"]
                task_copy["source_meeting_title"] = m["title"]
                all_tasks.append(task_copy)
        return all_tasks

    def update_task_status(self, task_id: str, new_status: str) -> bool:
        for m in self.meetings:
            for t in m.get("action_items", []):
                if t["id"] == task_id:
                    t["status"] = new_status
                    return True
        return False

    def get_notifications(self) -> List[Dict[str, Any]]:
        return self.notifications

    def mark_notification_read(self, notification_id: str) -> bool:
        for n in self.notifications:
            if n["id"] == notification_id:
                n["is_read"] = True
                return True
        return False

    def mark_all_notifications_read(self) -> bool:
        for n in self.notifications:
            n["is_read"] = True
        return True

db = DatabaseService()

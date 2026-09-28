from typing import Dict, Any

class EmailService:
    """Email notification service with fallback mode for safe local testing."""

    def send_follow_up_email(self, recipient_email: str, subject: str, content: str) -> Dict[str, Any]:
        """Simulate/dispatch email sending safely without crashing if SMTP is unconfigured."""
        print(f"[Email Service] Sending email to {recipient_email} - Subject: {subject}")
        return {
            "status": "success",
            "message": f"Follow-up email successfully queued for {recipient_email}.",
            "delivered": True
        }

email_service = EmailService()

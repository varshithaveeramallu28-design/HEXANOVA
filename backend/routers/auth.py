from fastapi import APIRouter, HTTPException
from pydantic import BaseModel, EmailStr
from typing import Optional

router = APIRouter(prefix="/api/auth", tags=["Auth"])

class LoginRequest(BaseModel):
    email: str
    password: str

class SignUpRequest(BaseModel):
    full_name: str
    email: str
    password: str
    confirm_password: Optional[str] = None

@router.post("/login")
def login(req: LoginRequest):
    if not req.email or not req.password:
        raise HTTPException(status_code=400, detail="Email and password required")
    
    return {
        "user": {
            "id": "demo-user-123",
            "email": req.email,
            "full_name": req.email.split('@')[0].capitalize(),
            "role": "Manager",
            "avatar_url": "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=256"
        },
        "token": "demo-jwt-token-ai-meeting-intelligence"
    }

@router.post("/signup")
def signup(req: SignUpRequest):
    if req.password != req.confirm_password:
        raise HTTPException(status_code=400, detail="Passwords do not match")
    
    return {
        "user": {
            "id": "demo-user-new",
            "email": req.email,
            "full_name": req.full_name,
            "role": "Employee",
            "avatar_url": ""
        },
        "message": "Account created successfully"
    }

@router.get("/me")
def get_me():
    return {
        "id": "demo-user-123",
        "email": "varsha@example.com",
        "full_name": "Varsha Sharma",
        "role": "Manager",
        "avatar_url": "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=256"
    }

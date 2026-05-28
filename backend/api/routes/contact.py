"""Contact API routes — /api/contact endpoints."""

import logging

from fastapi import APIRouter, HTTPException
from pydantic import BaseModel, field_validator

from db.connection import get_db, is_available as db_available

logger = logging.getLogger("portfolio.contact")

router = APIRouter(prefix="/api", tags=["contact"])


class ContactPayload(BaseModel):
    name: str
    email: str
    subject: str
    message: str

    @field_validator("name", "email", "subject", "message")
    @classmethod
    def not_empty(cls, v: str) -> str:
        v = v.strip()
        if not v:
            raise ValueError("Field cannot be empty")
        return v

    @field_validator("email")
    @classmethod
    def validate_email(cls, v: str) -> str:
        if "@" not in v or "." not in v:
            raise ValueError("Invalid email address")
        return v

    @field_validator("message")
    @classmethod
    def validate_message_length(cls, v: str) -> str:
        if len(v) > 5000:
            raise ValueError("Message too long (max 5000 characters)")
        return v


class ContactResponse(BaseModel):
    id: int
    name: str
    email: str
    subject: str
    message: str
    created_at: str


@router.post("/contact")
async def submit_contact(req: ContactPayload):
    if not db_available():
        raise HTTPException(status_code=503, detail="Service temporarily unavailable")

    try:
        with get_db() as conn:
            cur = conn.cursor()
            cur.execute(
                "INSERT INTO contact_messages (name, email, subject, message) VALUES (%s, %s, %s, %s) RETURNING id, created_at",
                (req.name, req.email, req.subject, req.message),
            )
            result = cur.fetchone()
            conn.commit()
            cur.close()

            if result:
                return {
                    "id": result[0],
                    "name": req.name,
                    "email": req.email,
                    "subject": req.subject,
                    "message": req.message,
                    "created_at": str(result[1])
                }
            else:
                raise HTTPException(status_code=500, detail="Failed to save message")
    except HTTPException:
        raise
    except Exception as e:
        logger.error("Could not save contact message: %s", e)
        raise HTTPException(status_code=500, detail="Database error")

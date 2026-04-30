"""Contact API routes — /api/contact endpoints."""

from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from db.connection import get_db

router = APIRouter(prefix="/api", tags=["contact"])

class ContactPayload(BaseModel):
    name: str
    email: str
    subject: str
    message: str

class ContactResponse(BaseModel):
    id: int
    name: str
    email: str
    subject: str
    message: str
    created_at: str

@router.post("/contact")
async def submit_contact(req: ContactPayload):
    try:
        conn = get_db()
        cur = conn.cursor()
        cur.execute(
            "INSERT INTO contact_messages (name, email, subject, message) VALUES (%s, %s, %s, %s) RETURNING id, created_at",
            (req.name, req.email, req.subject, req.message),
        )
        result = cur.fetchone()
        conn.commit()
        cur.close()
        conn.close()

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
    except Exception as e:
        print(f"[DB] Could not save contact message: {e}")
        raise HTTPException(status_code=500, detail="Database error")

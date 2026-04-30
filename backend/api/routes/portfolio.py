"""Portfolio API routes — /api/projects and /api/skills endpoints."""

from fastapi import APIRouter

router = APIRouter(prefix="/api", tags=["portfolio"])

@router.get("/projects")
async def get_projects():
    # Return empty list to trigger frontend fallback which contains the full data
    return []

@router.get("/skills")
async def get_skills():
    # Return empty list to trigger frontend fallback which contains the full data
    return []

@router.get("/projects/{project_id}")
async def get_project(project_id: int):
    return None

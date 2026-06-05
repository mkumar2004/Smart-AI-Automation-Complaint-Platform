from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from services.complaint_ai_service import analyze_complaint

router = APIRouter()


class ComplaintRequest(BaseModel):
    title: str
    description: str
    category: str = "other"


class HealthResponse(BaseModel):
    status: str
    message: str


@router.get("/health", response_model=HealthResponse)
async def health():
    return {"status": "ok", "message": "AI Service is running"}


@router.post("/analyze")
async def analyze(request: ComplaintRequest):
    try:
        if not request.title or not request.description:
            raise HTTPException(
                status_code=400,
                detail="Title and description are required"
            )

        result = await analyze_complaint(
            title=request.title,
            description=request.description,
            category=request.category,
        )

        return {"success": True, **result}

    except Exception as e:
        print(f"❌ Analysis error: {str(e)}")
        raise HTTPException(
            status_code=500,
            detail=f"Analysis failed: {str(e)}"
        )
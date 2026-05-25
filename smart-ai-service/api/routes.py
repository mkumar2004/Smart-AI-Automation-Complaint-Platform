from fastapi import APIRouter, File, HTTPException, UploadFile

from api.schemas import (
    AnalyticsRequest,
    ComplaintAnalyzeRequest,
    DuplicateCheckRequest,
    IndexComplaintRequest,
    ResponseGenerateRequest,
)
from services.analytics import generate_analytics_summary
from services.duplicate_detection import check_duplicates, index_complaint
from services.ocr import extract_text_from_image
from services.pipeline import analyze_complaint
from services.response_generator import generate_response

router = APIRouter(prefix="/api/v1", tags=["ai"])


@router.get("/health")
def health():
    return {"success": True, "service": "Smart AI Automation Complaint Platform — AI"}


@router.post("/analyze")
def analyze(body: ComplaintAnalyzeRequest):
    """Full pipeline: category, sentiment, priority, duplicates, department."""
    return analyze_complaint(body.model_dump())


@router.post("/categorize")
def categorize(body: ComplaintAnalyzeRequest):
    from services.categorization import categorize_complaint

    return {"category": categorize_complaint(body.title, body.description)}


@router.post("/sentiment")
def sentiment(body: ComplaintAnalyzeRequest):
    from services.sentiment import analyze_sentiment

    return analyze_sentiment(body.title, body.description)


@router.post("/priority")
def priority(body: ComplaintAnalyzeRequest):
    from services.priority import predict_priority
    from services.sentiment import analyze_sentiment

    s = analyze_sentiment(body.title, body.description)
    from services.categorization import categorize_complaint

    cat = categorize_complaint(body.title, body.description)
    return {
        "priority": predict_priority(
            body.title, body.description, cat, s.get("label", "neutral")
        )
    }


@router.post("/duplicates")
def duplicates(body: DuplicateCheckRequest):
    return {
        "duplicates": check_duplicates(
            body.complaint_id,
            body.organization_id,
            body.title,
            body.description,
        )
    }


@router.post("/index")
def index(body: IndexComplaintRequest):
    index_complaint(
        body.complaint_id,
        body.organization_id,
        body.title,
        body.description,
    )
    return {"success": True}


@router.post("/department")
def department(body: ComplaintAnalyzeRequest):
    from services.categorization import categorize_complaint
    from services.department_assignment import assign_department

    cat = categorize_complaint(body.title, body.description)
    return assign_department(body.title, body.description, cat, body.departments)


@router.post("/response")
def response(body: ResponseGenerateRequest):
    return {"response": generate_response(**body.model_dump())}


@router.post("/analytics/summary")
def analytics_summary(body: AnalyticsRequest):
    return {"summary": generate_analytics_summary(body.stats)}


@router.post("/ocr")
async def ocr(file: UploadFile = File(...)):
    if not file.content_type or not file.content_type.startswith("image/"):
        raise HTTPException(400, "Upload an image file")
    data = await file.read()
    try:
        text = extract_text_from_image(data)
    except Exception as exc:
        raise HTTPException(500, str(exc)) from exc
    return {"text": text}

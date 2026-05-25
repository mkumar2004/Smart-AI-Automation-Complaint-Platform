"""
Core AI workflow:
  submit → categorize → sentiment → priority → duplicates → department → index
"""

from services.categorization import categorize_complaint
from services.department_assignment import assign_department
from services.duplicate_detection import check_duplicates, index_complaint
from services.priority import predict_priority
from services.sentiment import analyze_sentiment


def analyze_complaint(payload: dict) -> dict:
    title = payload.get("title", "")
    description = payload.get("description", "")
    organization_id = payload.get("organization_id", "default")
    complaint_id = payload.get("complaint_id")
    departments = payload.get("departments", ["general", "billing", "technical", "support"])
    index_after = payload.get("index_after_analysis", True)

    category = categorize_complaint(title, description)
    sentiment = analyze_sentiment(title, description)
    priority = predict_priority(
        title,
        description,
        category,
        sentiment.get("label", "neutral"),
    )
    duplicates = check_duplicates(complaint_id, organization_id, title, description)
    department = assign_department(title, description, category, departments)

    if index_after and complaint_id:
        index_complaint(complaint_id, organization_id, title, description)

    return {
        "category": category,
        "sentiment": sentiment,
        "priority": priority,
        "duplicates": duplicates,
        "department": department,
        "is_duplicate": len(duplicates) > 0,
    }

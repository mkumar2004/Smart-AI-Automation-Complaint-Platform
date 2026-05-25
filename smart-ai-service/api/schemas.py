from pydantic import BaseModel, Field


class ComplaintAnalyzeRequest(BaseModel):
    title: str
    description: str
    organization_id: str = "default"
    complaint_id: str | None = None
    departments: list[str] = Field(
        default_factory=lambda: ["general", "billing", "technical", "support"]
    )
    index_after_analysis: bool = True


class ResponseGenerateRequest(BaseModel):
    title: str
    description: str
    status: str = "open"
    category: str = "other"


class AnalyticsRequest(BaseModel):
    stats: dict


class DuplicateCheckRequest(BaseModel):
    title: str
    description: str
    organization_id: str = "default"
    complaint_id: str | None = None


class IndexComplaintRequest(BaseModel):
    complaint_id: str
    organization_id: str
    title: str
    description: str

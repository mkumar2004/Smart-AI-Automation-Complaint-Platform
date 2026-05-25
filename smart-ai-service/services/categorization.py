from langchain_core.prompts import ChatPromptTemplate

from prompts.templates import CATEGORIZATION_PROMPT
from utils.llm import get_chat_model

VALID_CATEGORIES = {
    "billing",
    "technical",
    "service_quality",
    "delivery",
    "account",
    "safety",
    "other",
}


def categorize_complaint(title: str, description: str) -> str:
    prompt = ChatPromptTemplate.from_messages([("human", CATEGORIZATION_PROMPT)])
    chain = prompt | get_chat_model(temperature=0)
    raw = chain.invoke({"title": title, "description": description})
    category = (raw.content if hasattr(raw, "content") else str(raw)).strip().lower()
    return category if category in VALID_CATEGORIES else "other"

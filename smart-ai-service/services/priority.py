from langchain_core.prompts import ChatPromptTemplate

from prompts.templates import PRIORITY_PROMPT
from utils.llm import get_chat_model

VALID_PRIORITIES = {"low", "medium", "high", "critical"}


def predict_priority(
    title: str,
    description: str,
    category: str,
    sentiment: str,
) -> str:
    prompt = ChatPromptTemplate.from_messages([("human", PRIORITY_PROMPT)])
    chain = prompt | get_chat_model(temperature=0)
    raw = chain.invoke(
        {
            "title": title,
            "description": description,
            "category": category,
            "sentiment": sentiment,
        }
    )
    priority = (raw.content if hasattr(raw, "content") else str(raw)).strip().lower()
    return priority if priority in VALID_PRIORITIES else "medium"

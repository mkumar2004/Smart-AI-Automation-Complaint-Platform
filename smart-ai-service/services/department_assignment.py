import json

from langchain_core.prompts import ChatPromptTemplate

from prompts.templates import DEPARTMENT_PROMPT
from utils.llm import get_chat_model


def assign_department(
    title: str,
    description: str,
    category: str,
    departments: list[str],
) -> dict:
    if not departments:
        return {"department": "general", "confidence": 0.5, "reason": "No departments provided"}

    prompt = ChatPromptTemplate.from_messages([("human", DEPARTMENT_PROMPT)])
    chain = prompt | get_chat_model(temperature=0)
    raw = chain.invoke(
        {
            "title": title,
            "description": description,
            "category": category,
            "departments": ", ".join(departments),
        }
    )
    text = raw.content if hasattr(raw, "content") else str(raw)
    try:
        return json.loads(text)
    except json.JSONDecodeError:
        return {"department": departments[0], "confidence": 0.5, "reason": text[:200]}

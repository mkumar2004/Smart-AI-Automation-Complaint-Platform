from langchain_core.prompts import ChatPromptTemplate

from prompts.templates import RESPONSE_PROMPT
from utils.llm import get_chat_model


def generate_response(
    title: str,
    description: str,
    status: str,
    category: str,
) -> str:
    prompt = ChatPromptTemplate.from_messages([("human", RESPONSE_PROMPT)])
    chain = prompt | get_chat_model(temperature=0.4)
    raw = chain.invoke(
        {
            "title": title,
            "description": description,
            "status": status,
            "category": category,
        }
    )
    return raw.content if hasattr(raw, "content") else str(raw)

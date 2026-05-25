import json

from langchain_core.prompts import ChatPromptTemplate

from prompts.templates import ANALYTICS_SUMMARY_PROMPT
from utils.llm import get_chat_model


def generate_analytics_summary(stats: dict) -> str:
    prompt = ChatPromptTemplate.from_messages([("human", ANALYTICS_SUMMARY_PROMPT)])
    chain = prompt | get_chat_model(temperature=0.3)
    raw = chain.invoke({"stats_json": json.dumps(stats, default=str)})
    return raw.content if hasattr(raw, "content") else str(raw)

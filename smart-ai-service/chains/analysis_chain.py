from langchain_core.output_parsers import JsonOutputParser
from langchain_core.prompts import ChatPromptTemplate
from pydantic import BaseModel, Field

from prompts.templates import SENTIMENT_PROMPT
from utils.llm import get_chat_model


class SentimentResult(BaseModel):
    label: str = Field(description="positive, neutral, or negative")
    score: float = Field(description="-1 to 1")
    summary: str


def run_structured_analysis(title: str, description: str) -> SentimentResult:
    """LangChain chain: structured sentiment via JSON parser."""
    parser = JsonOutputParser(pydantic_object=SentimentResult)
    prompt = ChatPromptTemplate.from_messages(
        [
            ("system", "You analyze customer complaints. {format_instructions}"),
            ("human", SENTIMENT_PROMPT),
        ]
    )
    chain = prompt | get_chat_model() | parser
    return chain.invoke(
        {
            "title": title,
            "description": description,
            "format_instructions": parser.get_format_instructions(),
        }
    )

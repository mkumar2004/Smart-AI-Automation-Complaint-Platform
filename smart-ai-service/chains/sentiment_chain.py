import json
from langchain_groq import ChatGroq
from langchain_core.prompts import PromptTemplate
from langchain_core.output_parsers import StrOutputParser
from config.settings import settings
from prompts.sentiment import SENTIMENT_PROMPT


def run_sentiment_chain(title: str, description: str) -> dict:
    llm = ChatGroq(
        api_key=settings.GROQ_API_KEY,
        model=settings.MODEL_NAME,
        temperature=settings.TEMPERATURE,
    )

    prompt = PromptTemplate(
        template=SENTIMENT_PROMPT,
        input_variables=["title", "description"],
    )

    chain = prompt | llm | StrOutputParser()

    result = chain.invoke({"title": title, "description": description})

    try:
        result = result.strip()
        if result.startswith("```"):
            result = result.split("```")[1]
            if result.startswith("json"):
                result = result[4:]
        return json.loads(result)
    except json.JSONDecodeError:
        return {
            "sentiment": "neutral",
            "sentimentScore": 0.5,
            "urgencyLevel": "medium",
        }
import json
from langchain_groq import ChatGroq
from langchain_core.prompts import PromptTemplate
from langchain_core.output_parsers import StrOutputParser
from config.settings import settings
from prompts.classify import CLASSIFY_PROMPT


def run_classify_chain(title: str, description: str) -> dict:
    llm = ChatGroq(
        api_key=settings.GROQ_API_KEY,
        model=settings.MODEL_NAME,
        temperature=settings.TEMPERATURE,
    )

    prompt = PromptTemplate(
        template=CLASSIFY_PROMPT,
        input_variables=["title", "description"],
    )

    chain = prompt | llm | StrOutputParser()

    result = chain.invoke({"title": title, "description": description})

    try:
        # Clean result in case model adds extra text
        result = result.strip()
        if result.startswith("```"):
            result = result.split("```")[1]
            if result.startswith("json"):
                result = result[4:]
        return json.loads(result)
    except json.JSONDecodeError:
        return {"category": "other", "confidence": 0.5}
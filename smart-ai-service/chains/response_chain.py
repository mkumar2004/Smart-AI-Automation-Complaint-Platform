from langchain_groq import ChatGroq
from langchain_core.prompts import PromptTemplate
from langchain_core.output_parsers import StrOutputParser
from config.settings import settings
from prompts.response import RESPONSE_PROMPT


def run_response_chain(
    title: str,
    description: str,
    category: str,
    sentiment: str,
    priority: str,
) -> str:
    llm = ChatGroq(
        api_key=settings.GROQ_API_KEY,
        model=settings.MODEL_NAME,
        temperature=0.3,
    )

    prompt = PromptTemplate(
        template=RESPONSE_PROMPT,
        input_variables=["title", "description", "category", "sentiment", "priority"],
    )

    chain = prompt | llm | StrOutputParser()

    result = chain.invoke({
        "title": title,
        "description": description,
        "category": category,
        "sentiment": sentiment,
        "priority": priority,
    })

    return result.strip()
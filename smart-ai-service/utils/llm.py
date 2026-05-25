from functools import lru_cache

from langchain_openai import ChatOpenAI, OpenAIEmbeddings

from config.settings import settings


@lru_cache
def get_chat_model(temperature: float = 0.2) -> ChatOpenAI:
    return ChatOpenAI(
        model=settings.openai_model,
        api_key=settings.openai_api_key or None,
        temperature=temperature,
    )


@lru_cache
def get_embeddings() -> OpenAIEmbeddings:
    return OpenAIEmbeddings(
        model=settings.embedding_model,
        api_key=settings.openai_api_key or None,
    )

from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    model_config = SettingsConfigDict(
        env_file=".env",
        env_file_encoding="utf-8",
        extra="ignore",
    )

    openai_api_key: str = ""
    openai_model: str = "gpt-4o-mini"
    embedding_model: str = "text-embedding-3-small"

    ai_host: str = "0.0.0.0"
    ai_port: int = 8000

    chroma_persist_dir: str = "./data/chroma"
    duplicate_similarity_threshold: float = 0.88


settings = Settings()

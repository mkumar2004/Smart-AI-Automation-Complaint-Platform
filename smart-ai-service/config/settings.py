from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    GROQ_API_KEY: str
    MODEL_NAME: str = "llama-3.1-8b-instant"
    PORT: int = 8000
    TEMPERATURE: float = 0.1

    model_config = {
        "env_file": ".env",
        "extra": "ignore"
    }

settings = Settings()
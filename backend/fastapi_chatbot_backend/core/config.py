import os
from dotenv import load_dotenv

load_dotenv()

class Settings:
  PROJECT_NAME: str = "ChatBot"
  PROJECT_VERSION: str = "1.0.0"
  GROQ_API_KEY: str = os.getenv("GROQ_API_KEY")
  GROQ_ENDPOINT: str = "https://api.groq.com/openai/v1/chat/completions"

settings = Settings()
import os
from dotenv import load_dotenv

# Load .env file
load_dotenv()

class Settings:
    # App
    PORT: int = int(os.getenv("PORT", 8000))
    HOST: str = os.getenv("HOST", "127.0.0.1")
    DEBUG: bool = os.getenv("DEBUG", "true").lower() == "true"

    # NVIDIA NIM AI
    NVIDIA_NIM_API_KEY: str = os.getenv("NVIDIA_NIM_API_KEY", "")
    NVIDIA_NIM_BASE_URL: str = os.getenv("NVIDIA_NIM_BASE_URL", "https://integrate.api.nvidia.com/v1")
    NVIDIA_NIM_MODEL: str = os.getenv("NVIDIA_NIM_MODEL", "meta/llama-3.1-70b-instruct")

    # Supabase
    SUPABASE_URL: str = os.getenv("SUPABASE_URL", "")
    SUPABASE_ANON_KEY: str = os.getenv("SUPABASE_ANON_KEY", "")
    SUPABASE_SERVICE_ROLE_KEY: str = os.getenv("SUPABASE_SERVICE_ROLE_KEY", "")

    # Hindsight Memory
    HINDSIGHT_EMBEDDING_DIM: int = int(os.getenv("HINDSIGHT_EMBEDDING_DIM", 1536))
    HINDSIGHT_SIMILARITY_THRESHOLD: float = float(os.getenv("HINDSIGHT_SIMILARITY_THRESHOLD", 0.75))

settings = Settings()

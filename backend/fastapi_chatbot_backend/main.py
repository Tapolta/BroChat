from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from api import chat
from api import auth

from dependencies import limiter
from slowapi import _rate_limit_exceeded_handler
from slowapi.errors import RateLimitExceeded

app = FastAPI(title="Chatbot Backend")
app.state.limiter = limiter
app.add_exception_handler(RateLimitExceeded, _rate_limit_exceeded_handler)

app.add_middleware(
  CORSMiddleware,
  allow_origins=["https://chat.tapolta.my.id", "http://localhost:5173"], 
  allow_credentials=True,
  allow_methods=["*"],
  allow_headers=["*"],
)

app.include_router(chat.router, prefix="/api/chat", tags=["Chat"])
app.include_router(auth.router, prefix="/api/auth", tags=["Auth"])

@app.get("/")
async def root():
  return {"message": "Server backend aktif!"}
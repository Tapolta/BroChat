# from fastapi import APIRouter, HTTPException, Request # Pastikan Request diimpor
# import httpx
# from schemas.chat import ChatRequest, ChatResponse
# from dependencies import limiter

# GEMINI_API_KEY = ""

# router = APIRouter()

# @router.post("/", response_model=ChatResponse)
# @limiter.limit("5/minute")
# async def chat_with_gemini(chat_data: ChatRequest, request: Request):
#     endpoint = f"https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key={GEMINI_API_KEY}"
    
#     payload = {
#         "contents": [
#             {
#                 "parts": [
#                     {"text": chat_data.message}
#                 ]
#             }
#         ],
#         "generationConfig": {
#             "maxOutputTokens": 200,
#             "temperature": 0.7
#         }
#     }

#     async with httpx.AsyncClient() as client:
#         try:
#             response = await client.post(endpoint, json=payload, timeout=30.0)
#             response.raise_for_status()
            
#             data = response.json()
#             reply_text = data["candidates"][0]["content"]["parts"][0]["text"]
#             return {"reply": reply_text}
            
#         except httpx.HTTPStatusError as e:
#             error_detail = e.response.text
#             print(f"Error dari Google: {error_detail}") 
            
#             raise HTTPException(
#                 status_code=502, 
#                 detail=f"Google Gemini API menolak request. Alasan dari Google: {error_detail}"
#             )
            
#         except Exception as e:
#             print(f"Sistem error: {e}")
#             raise HTTPException(status_code=500, detail=f"Terjadi kesalahan pada server: {str(e)}")

from fastapi import APIRouter, Request
from schemas.chat import ChatRequest, ChatResponse
from dependencies import limiter
from services.groq_service import call_groq_api
from services.knowledge_service import load_context

router = APIRouter()

@router.post("/", response_model=ChatResponse)
@limiter.limit("5/minute")
async def chat_with_groq(chat_data: ChatRequest, request: Request):
  # reply_text = await call_groq_api(chat_data.message, context=load_context())
  reply_text = await call_groq_api(chat_data.message)
  return {"reply": reply_text}
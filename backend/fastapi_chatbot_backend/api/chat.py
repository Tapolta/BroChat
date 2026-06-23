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

import uuid
from fastapi import APIRouter, Request, Depends, HTTPException 
from dependencies.auth_dep import get_authenticated_user
from schemas.schemas import ChatHistoryResponse, ChatRequest, ChatResponse, NewChatResponse
from dependencies.cloudflared_dep import limiter
from services.groq_service import call_groq_api_guest, call_groq_api_member
from data.dummy_db import IN_MEMORY_DB

router = APIRouter()

@router.post("/guest", response_model=ChatResponse)
@limiter.limit("3/minute")
async def chat_as_guest(chat_data: ChatRequest, request: Request):
  reply_text = await call_groq_api_guest(chat_data.message)
  return ChatResponse(reply=reply_text)


@router.post("/member", response_model=NewChatResponse)
@limiter.limit("10/minute")
async def create_new_chat_member(
    chat_data: ChatRequest, 
    request: Request,
    user: dict = Depends(get_authenticated_user)
):
    new_chat_id = str(uuid.uuid4())
    
    user_message = {"role": "user", "content": chat_data.message}
    
    IN_MEMORY_DB[new_chat_id] = {
      "user_id": user["id"],
      "messages": [user_message]
    }
    
    reply_text = await call_groq_api_member(IN_MEMORY_DB[new_chat_id]["messages"], user=user)
    
    ai_message = {"role": "assistant", "content": reply_text}
    IN_MEMORY_DB[new_chat_id]["messages"].append(ai_message)
    
    return {"chatId": new_chat_id, "reply": reply_text}


@router.post("/member/{chat_id}", response_model=ChatResponse)
@limiter.limit("10/minute")
async def reply_existing_chat(
  chat_id: str,
  chat_data: ChatRequest, 
  request: Request,
  user: dict = Depends(get_authenticated_user)
):
  if chat_id not in IN_MEMORY_DB:
    raise HTTPException(status_code=404, detail="Chat tidak ditemukan atau sudah terhapus dari memory")
      
  # LOGIKA KEAMANAN: Cek apakah user yang login adalah pemilik chat ini
  if IN_MEMORY_DB[chat_id]["user_id"] != user["id"]:
    raise HTTPException(status_code=403, detail="Akses ditolak: Anda bukan pemilik riwayat obrolan ini.")
      
  user_message = {"role": "user", "content": chat_data.message}
  IN_MEMORY_DB[chat_id]["messages"].append(user_message)
  
  reply_text = await call_groq_api_member(IN_MEMORY_DB[chat_id]["messages"], user=user)
  
  ai_message = {"role": "assistant", "content": reply_text}
  IN_MEMORY_DB[chat_id]["messages"].append(ai_message)
  
  return {"reply": reply_text}


@router.get("/member/{chat_id}", response_model=ChatHistoryResponse)
async def get_chat_history(
  chat_id: str, 
  user: dict = Depends(get_authenticated_user)
):
  if chat_id not in IN_MEMORY_DB:
    raise HTTPException(status_code=404, detail="Chat tidak ditemukan")
      
  # LOGIKA KEAMANAN: Cek kepemilikan saat menarik riwayat chat lama
  if IN_MEMORY_DB[chat_id]["user_id"] != user["id"]:
    raise HTTPException(status_code=403, detail="Akses ditolak: Anda bukan pemilik riwayat obrolan ini.")
      
  return {"chatId": chat_id, "messages": IN_MEMORY_DB[chat_id]["messages"]}
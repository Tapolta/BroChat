from fastapi import APIRouter, Depends
from schemas.schemas import RegisterResponse, UserRegister, UserLogin, LoginResponse
from services import auth_service
from dependencies.auth_dep import get_authenticated_user
from data.dummy_db import IN_MEMORY_DB 

router = APIRouter()

@router.post("/register", response_model=RegisterResponse)
def register_user(user_data: UserRegister):
  return auth_service.register_new_user(user_data)

@router.post("/login", response_model=LoginResponse)
def login_user(user_data: UserLogin):
  return auth_service.login_existing_user(user_data)

@router.get("/me")
async def get_current_user_profile(
  current_user: dict = Depends(get_authenticated_user)
):
  user_chats = []
  current_user_id = current_user["id"]
  
  for chat_id, chat_data in IN_MEMORY_DB.items():
    if chat_data.get("user_id") != current_user_id:
      continue
        
    messages = chat_data.get("messages", [])
    title = messages[0]["content"] if messages else "Chat kosong"
        
    user_chats.insert(0, {
      "chatId": chat_id,
      "title": title
    })
  
  return {
    "id": current_user_id,
    "email": current_user["email"],
    "chats": user_chats
  }
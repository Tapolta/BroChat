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
  
  for chat_id, chat_data in IN_MEMORY_DB.items():
    if chat_data.get("user_id") == current_user["id"]:
        
      first_message = "Chat kosong"
      if "messages" in chat_data and len(chat_data["messages"]) > 0:
        first_message = chat_data["messages"][0]["content"]
          
      user_chats.insert(0, {
        "chatId": chat_id,
        "title": first_message
      })
  
  return {
    "id": current_user["id"],
    "email": current_user["email"],
    "chats": user_chats
  }
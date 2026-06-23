from fastapi import Header, HTTPException, status
from data.dummy_db import LOGIN_SESSIONS, DUMMY_USERS_DB

async def get_authenticated_user(x_session_key: str = Header(None, description="Token session user")):
  if not x_session_key or x_session_key not in LOGIN_SESSIONS:
    raise HTTPException(
      status_code=status.HTTP_401_UNAUTHORIZED,
      detail="Sesi tidak valid atau Anda belum login."
    )
  
  user_email = LOGIN_SESSIONS[x_session_key]
  
  user_data = next((user for user in DUMMY_USERS_DB if user["email"] == user_email), None)
  
  if not user_data:
    raise HTTPException(
      status_code=status.HTTP_404_NOT_FOUND,
      detail="Data pengguna tidak ditemukan."
    )
    
  return {
    "email": user_data["email"],
    "id": user_data["id"]
  }
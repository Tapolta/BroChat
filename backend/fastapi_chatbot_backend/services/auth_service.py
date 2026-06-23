# app/services/auth_service.py
import uuid
from fastapi import HTTPException, status
from data.dummy_db import DUMMY_USERS_DB, LOGIN_SESSIONS
from schemas.schemas import UserRegister, UserLogin, RegisterResponse, LoginResponse

def register_new_user(user_data: UserRegister) -> RegisterResponse:
  target_email = user_data.email.strip().lower()
  user_id = user_data.id.strip()
  
  email_exists = any(user["email"] == target_email for user in DUMMY_USERS_DB)
  if email_exists:
    raise HTTPException(
      status_code=status.HTTP_409_CONFLICT,
      detail="Email sudah terdaftar/terpakai. Silakan gunakan email lain."
    )
      
  new_user = {"email": target_email, "password": user_data.password, "id": user_id}
  DUMMY_USERS_DB.append(new_user)
  
  return RegisterResponse(status="success", message="Registrasi berhasil!")


def login_existing_user(user_data: UserLogin) -> LoginResponse:
  target_email = user_data.email.strip().lower()
  
  user_found = next(
    (user for user in DUMMY_USERS_DB if user["email"] == target_email and user["password"] == user_data.password), 
    None
  )
  
  if not user_found:
    raise HTTPException(
      status_code=status.HTTP_401_UNAUTHORIZED,
      detail="Email atau password salah. Silakan periksa kembali."
    )
  
  generated_key = str(uuid.uuid4())
  LOGIN_SESSIONS[generated_key] = target_email
  
  print(f"\n[SESSION CREATED] Key: {generated_key} -> User: {LOGIN_SESSIONS[generated_key]}")
  print(f"Total Active Sessions: {LOGIN_SESSIONS}\n")

  return LoginResponse(
    status="success",
    message="Login berhasil!",
    session_key=generated_key
  )
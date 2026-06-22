import uuid
from fastapi import APIRouter, Request, HTTPException, status
from schemas.schemas import UserRegister, ChatResponse, UserLogin, LoginResponse

router = APIRouter()

DUMMY_USERS_DB = [
  {"email": "admin@kampus.com", "password": "rahasia123"}
]

LOGIN_SESSIONS = {}


@router.post("/register", response_model=ChatResponse)
def register_user(request: Request, user_data: UserRegister):
  target_email = user_data.email.strip().lower()
  email_exists = any(user["email"] == target_email for user in DUMMY_USERS_DB)
  
  if email_exists:
    raise HTTPException(
      status_code=status.HTTP_409_CONFLICT,
      detail="Email sudah terdaftar/terpakai. Silakan gunakan email lain."
    )
    
  new_user = {"email": target_email, "password": user_data.password}
  DUMMY_USERS_DB.append(new_user)
  return ChatResponse(status="success", message="Registrasi berhasil!")


@router.post("/login", response_model=LoginResponse)
def login_user(user_data: UserLogin):
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
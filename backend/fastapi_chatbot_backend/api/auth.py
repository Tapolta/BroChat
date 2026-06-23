from fastapi import APIRouter, Depends
from schemas.schemas import RegisterResponse, UserRegister, UserLogin, LoginResponse
from services import auth_service
from dependencies.auth_dep import get_authenticated_user

router = APIRouter()

@router.post("/register", response_model=RegisterResponse)
def register_user(user_data: UserRegister):
  return auth_service.register_new_user(user_data)

@router.post("/login", response_model=LoginResponse)
def login_user(user_data: UserLogin):
  return auth_service.login_existing_user(user_data)

@router.get("/me")
async def get_current_user_profile(current_user: dict = Depends(get_authenticated_user)):
  return current_user
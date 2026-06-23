from pydantic import BaseModel
from typing import List

class ChatRequest(BaseModel):
	message: str

class ChatResponse(BaseModel):
	reply: str

class NewChatResponse(BaseModel):
	chatId: str
	reply: str

class MessageItem(BaseModel):
	role: str
	content: str

class ChatHistoryResponse(BaseModel):
	chatId: str
	messages: List[MessageItem]

class UserRegister(BaseModel):
	email: str
	id: str
	password: str

class UserLogin(BaseModel):
	email: str
	password: str

class LoginResponse(BaseModel):
	status: str
	message: str
	session_key: str

class RegisterResponse(BaseModel):
	status: str
	message: str
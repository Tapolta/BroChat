from slowapi import Limiter
from fastapi import Request

def get_cloudflare_ip(request: Request) -> str:
  cloudflare_ip = request.headers.get("cf-connecting-ip")
  return cloudflare_ip if cloudflare_ip else request.client.host

limiter = Limiter(key_func=get_cloudflare_ip)
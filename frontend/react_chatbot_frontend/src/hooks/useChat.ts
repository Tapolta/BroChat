import { useState, useCallback, useRef, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { chatService } from '../services/chatService';
import { storageManager } from '../utils/storage';

export type Message = {
  role: 'user' | 'assistant';
  content: string;
};

const handleChatError = (error: any): string => {
  console.error("Gagal memproses pesan:", error);
  
  const isUnauthorized = 
    error?.status === 401 || 
    error?.response?.status === 401 || 
    error?.message?.includes('401');

  if (isUnauthorized) {
    storageManager.clearSessionKey();
    return "Sesi login Anda telah berakhir. Silakan refresh halaman atau login kembali.";
  }

  return "Maaf, terjadi kesalahan saat menghubungi server.";
};

export function useChat() {
  const { chatId } = useParams<{ chatId?: string }>();
  const navigate = useNavigate();

  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  
  const abortControllerRef = useRef<AbortController | null>(null);

  useEffect(() => {
    return () => {
      if (abortControllerRef.current) abortControllerRef.current.abort();
    };
  }, []);

  useEffect(() => {
    if (!chatId) {
      setMessages([]);
      return;
    }

    const loadChatHistory = async () => {
      setIsLoading(true);
      const token = storageManager.getSessionKey() || "";

      try {
        const data = await chatService.getChatDetail(chatId, token);
        setMessages(data.messages || []);
      } catch (error: any) {
        const errorMessageContent = handleChatError(error);
        console.error("Gagal memuat histori:", errorMessageContent);
      } finally {
        setIsLoading(false);
      }
    };

    loadChatHistory();
  }, [chatId]);

  const sendMessage = useCallback(async (userText: string) => {
    if (!userText.trim() || isLoading) return;

    setIsLoading(true);

    const userMessage: Message = { role: 'user', content: userText };
    setMessages((prev) => [...prev, userMessage]);

    if (abortControllerRef.current) abortControllerRef.current.abort();
    abortControllerRef.current = new AbortController();

    const token = storageManager.getSessionKey(); 

    try {
      let data: any;
      
      if (token) {
        if (!chatId) {
          data = await chatService.createNewChatMember(userText, token);
          const newChatId = data.chatId || data.id;
          
          if (newChatId) {
            navigate(`/${newChatId}`, { replace: true });
          }
        } else {
          data = await chatService.sendMessageMember(chatId, userText, token);
        }
      } else {
        data = await chatService.sendMessageGuest(userText);
      }
      
      const aiMessage: Message = { role: 'assistant', content: data.reply };
      setMessages((prev) => [...prev, aiMessage]);
      
    } catch (error: any) {
      if (error?.name === 'CanceledError' || error?.name === 'AbortError') return;

      const errorMessageContent = handleChatError(error);
      const errorMessage: Message = { role: 'assistant', content: errorMessageContent };
      setMessages((prev) => [...prev, errorMessage]);
      
    } finally {
      setIsLoading(false);
      abortControllerRef.current = null;
    }
  }, [isLoading, chatId, navigate]);

  const clearChat = useCallback(() => {
    setMessages([]);
    navigate('/', { replace: true });
  }, [navigate]);

  return {
    messages,
    isLoading,
    sendMessage,
    clearChat,
    chatId
  };
}
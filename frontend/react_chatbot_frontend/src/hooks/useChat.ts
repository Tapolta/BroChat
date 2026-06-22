import { useState } from 'react';
import { chatService } from '../services/chatService';
import { storageManager } from '../utils/storage';

export type Message = {
  role: 'user' | 'assistant';
  content: string;
};

export function useChat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const sendMessage = async (userText: string) => {
    if (!userText.trim()) return;

    const userMessage: Message = { role: 'user', content: userText };
    setMessages((prev) => [...prev, userMessage]);
    
    setIsLoading(true);

    const token = storageManager.getSessionKey(); 

    try {
      let data;

      if (token) {
        data = await chatService.sendMessageMember(userText, token);
      } else {
        data = await chatService.sendMessageGuest(userText);
      }
      
      const aiMessage: Message = { role: 'assistant', content: data.reply };
      setMessages((prev) => [...prev, aiMessage]);
      
    } catch (error: any) {
      console.error("Gagal mengirim pesan:", error);

      if (error?.status === 401 || error?.response?.status === 401 || error?.message?.includes('401')) {
        storageManager.clearSessionKey();
        
        const errorMessage: Message = { 
          role: 'assistant', 
          content: "Sesi login Anda telah berakhir. Silakan refresh halaman atau login kembali." 
        };
        setMessages((prev) => [...prev, errorMessage]);
      } else {
        const errorMessage: Message = { 
          role: 'assistant', 
          content: "Maaf, terjadi kesalahan saat menghubungi server." 
        };
        setMessages((prev) => [...prev, errorMessage]);
      }
      
    } finally {
      setIsLoading(false);
    }
  };

  return {
    messages,
    isLoading,
    sendMessage
  };
}
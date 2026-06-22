import { useState } from 'react';
import { chatService } from '../services/chatService';

export type Message = {
  role: 'user' | 'assistant';
  content: string;
};

export function useChat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const sendMessage = async (userText: string) => {
    const userMessage: Message = { role: 'user', content: userText };
    setMessages((prev) => [...prev, userMessage]);
    
    setIsLoading(true);

    try {
      const data = await chatService.sendMessage(userText);
      
      const aiMessage: Message = { role: 'assistant', content: data.reply };
      setMessages((prev) => [...prev, aiMessage]);
      
    } catch (error) {
      console.error("Gagal mengirim pesan:", error);
      const errorMessage: Message = { 
        role: 'assistant', 
        content: "Maaf, terjadi kesalahan saat menghubungi server." 
      };
      setMessages((prev) => [...prev, errorMessage]);
      
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
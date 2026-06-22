import apiClient from '../api/axios';

export const chatService = {
  sendMessage: async (message: string) => {
    const response = await apiClient.post('/api/chat/', { message });
    return response.data;
  }
};
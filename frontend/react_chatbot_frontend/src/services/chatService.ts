import apiClient from '../api/axios';

export const chatService = {
  sendMessageGuest: async (message: string) => {
    const response = await apiClient.post('/api/chat/guest', { message });
    return response.data;
  },

  sendMessageMember: async (message: string, token: string) => {
    const response = await apiClient.post(
      '/api/chat/member', 
      { message },
      {
        headers: {
          'X-Session-Key': token,
        },
      }
    );
    
    return response.data; 
  }
};
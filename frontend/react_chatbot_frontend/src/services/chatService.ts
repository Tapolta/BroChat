import apiClient from '../api/axios';

export const chatService = {
  sendMessageGuest: async (message: string) => {
    const response = await apiClient.post('/api/chat/guest', { message });
    return response.data;
  },

  createNewChatGuest: async (message: string) => {
    const response = await apiClient.post('/api/chat/guest', { message });
    return {
      chatId: `guest-${Date.now()}`,
      reply: response.data.reply
    };
  },

  createNewChatMember: async (message: string, token: string) => {
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
  },

  sendMessageMember: async (chatId: string, message: string, token: string) => {
    const response = await apiClient.post(
      `/api/chat/member/${chatId}`,
      { message },
      {
        headers: {
          'X-Session-Key': token,
        },
      }
    );
    return response.data; 
  },

  getChatDetail: async (chatId: string, token: string) => {
    if (chatId.startsWith('guest-')) {
      return { chatId, messages: [] }; 
    }

    const response = await apiClient.get(
      `/api/chat/member/${chatId}`,
      {
        headers: {
          'X-Session-Key': token,
        },
      }
    );
    return response.data;
  }
};
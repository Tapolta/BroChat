import apiClient from '../api/axios';

export interface UserProfile {
  email: string;
  id: string;
}

export const authService = {
  getProfile: async (): Promise<UserProfile> => {
    const response = await apiClient.get('/api/auth/me');
    return response.data;
  },
};

export interface ChatHistoryItem {
  chatId: string;
  title: string;
}

export interface UserProfile {
  id: string;
  email: string;
  chats: ChatHistoryItem[];
}
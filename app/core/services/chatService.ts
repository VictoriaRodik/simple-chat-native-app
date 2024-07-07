import axios from 'axios';

const API_URL = 'https://be94a99b-1cf3-4eee-a7ef-5bcb1e52e10b.mock.pstmn.io';

export const createChat = async (name: string, createdBy: string) => {
  const response = await axios.post(`${API_URL}/chats`, { name, createdBy });
  return response.data;
};

export const deleteChat = async (id: string) => {
  await axios.delete(`${API_URL}/chats/${id}`);
};

export const fetchChats = async () => {
  const response = await axios.get(`${API_URL}/chats`);
  return response.data;
};

export const fetchMessages = async (chatId: string) => {
  const response = await axios.get(`${API_URL}/chats/${chatId}/messages`);
  return response.data;
};

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ChatState {
  chats: { id: string; name: string; createdBy: string }[];
  messages: { chatId: string; messageId: string; user: string; text: string }[];
  currentUser: string;
}

const initialState: ChatState = {
  chats: [],
  messages: [],
  currentUser: 'Me',
};

const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    addChat(state, action: PayloadAction<{ id: string; name: string; createdBy: string }>) {
      state.chats.push(action.payload);
    },
    deleteChat(state, action: PayloadAction<{ id: string }>) {
      state.chats = state.chats.filter(chat => chat.id !== action.payload.id);
    },
    addMessage(state, action: PayloadAction<{ chatId: string; messageId: string; user: string; text: string }>) {
      state.messages.push(action.payload);
    },
    deleteMessages(state, action: PayloadAction<{ chatId: string }>) {
      state.messages = state.messages.filter(message => message.chatId !== action.payload.chatId);
    }
  },
});

export const { addChat, deleteChat, addMessage, deleteMessages } = chatSlice.actions;
export default chatSlice.reducer;

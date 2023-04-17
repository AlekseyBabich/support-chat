import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ChatMessage, ListChats, User } from "@entity";

type ListChatsState = {
  allUsers: User[]
  listChats: ListChats[]
  listMessages: ChatMessage[]
  currentChatId: string | null
}

const initialState: ListChatsState = {
  allUsers: [],
  listChats: [],
  listMessages: [],
  currentChatId: null,
}

const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    setListChats(state, action) {
      state.listChats = action.payload
    },
    setCurrentChatId(state, action) {
      state.currentChatId = action.payload
    },
    setAllUsers(state, action) {
      state.allUsers = action.payload
    },
    setMessages(state, action) {
      state.listMessages = action.payload
    },
    addNewMessage(state, action: PayloadAction<ChatMessage>) {
      state.listMessages.push({
        id: action.payload.id,
        userId: action.payload.userId,
        chatId: action.payload.chatId,
        content: action.payload.content,
        createdAt: action.payload.createdAt,
        deletedAt: action.payload.deletedAt
      })
    }
  }
})

export const { setListChats, setCurrentChatId, setAllUsers, setMessages, addNewMessage } = chatSlice.actions
export default chatSlice.reducer

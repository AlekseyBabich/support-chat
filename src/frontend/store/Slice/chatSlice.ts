import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ListChats } from "@entity";


type ListChatsState = {
  listChats: ListChats[]
  currentChatId: string | null
}

const initialState: ListChatsState = {
  listChats: [],
  currentChatId: null
}

const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    setListChats(state, action) {
      state.listChats = action.payload
    },
    setCurrentChat(state, action) {
      state.currentChatId = action.payload
    },
  }
})

export const { setListChats, setCurrentChat } = chatSlice.actions
export default chatSlice.reducer

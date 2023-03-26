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
    setCurrentChatId(state, action) {
      state.currentChatId = action.payload
    },
  }
})

export const { setListChats, setCurrentChatId } = chatSlice.actions
export default chatSlice.reducer

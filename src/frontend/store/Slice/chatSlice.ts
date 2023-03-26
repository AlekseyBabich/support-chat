import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ListChats, User } from "@entity";


type ListChatsState = {
  listChats: ListChats[]
  currentChatId: string | null
  allUsers: User[]
}

const initialState: ListChatsState = {
  listChats: [],
  currentChatId: null,
  allUsers: [],
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
    }
  }
})

export const { setListChats, setCurrentChatId, setAllUsers } = chatSlice.actions
export default chatSlice.reducer

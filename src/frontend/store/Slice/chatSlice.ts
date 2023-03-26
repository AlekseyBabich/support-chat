import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ListChats } from "@entity";


type ListChatsState = {
  listChats: ListChats[]
  actualChat: string | null
}

const initialState: ListChatsState = {
  listChats: [],
  actualChat: null
}

const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    setListChats(state, action) {
      state.listChats = action.payload
    }
  }
})

export const { setListChats } = chatSlice.actions
export default chatSlice.reducer

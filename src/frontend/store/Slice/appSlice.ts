import { createSlice, PayloadAction } from "@reduxjs/toolkit";


type IMessage = {
  id: number
  text: string
}
type MessageState = {
  messages: IMessage[]
}

const initialState: MessageState = {
  messages: []
}

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    sendMessage(state, action: PayloadAction<string>) {
      state.messages.push({
        id: Date.now(),
        text: action.payload
      })
    }
  }
})

export const { sendMessage } = appSlice.actions
export default appSlice.reducer
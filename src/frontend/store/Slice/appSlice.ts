import { createSlice } from "@reduxjs/toolkit";

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
  }
})

export const { } = appSlice.actions
export default appSlice.reducer
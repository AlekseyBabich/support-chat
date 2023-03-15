import instance from "@src/frontend/pages/api/helpers/axios";


export const chatService = {
  async createChat(chatName: string, userName: string, userId: string | null) {
    debugger



    return instance.post('/createChat', { userName, chatName, userId })
  },
}

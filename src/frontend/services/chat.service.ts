import instance from "@src/frontend/pages/api/helpers/axios";

export const chatService = {
  async createChat(chatName: string, userName: string, createUserId: string | null) {
    return instance.post('/createChat', { userName, chatName, createUserId })
  },
}

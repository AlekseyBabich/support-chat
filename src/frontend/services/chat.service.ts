import instance from "@src/frontend/pages/api/helpers/axios";

export const chatService = {
  async createChat(chatName: string, userName: string) {
    return instance.post('/createChat', { userName, chatName })
  },

  async getListChats() {
    return instance.get('/listChats')
  },

  async getAllUsers() {
    return instance.get('/allUsers')
  },

  async addMessage(currentChatId: string | null, content: string | null) {
    return instance.post('/addMessage', { chatId: currentChatId, content: content })
  }
}

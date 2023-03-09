
export type ChatMessage = {
  id: string
  chatId: string
  userId: string
  content: string
  createdAt: Date
  deletedAt?: Date
}

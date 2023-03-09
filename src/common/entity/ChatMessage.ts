
export type ChatMessage = {
  messageId: string
  chatId: string
  userId: string
  content: string
  createdAt: Date
  deletedAt?: Date
}

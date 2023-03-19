
export type ListChats = {
  id: string
  chat: {
    id: string
    createUserId: string
    name: string
    createdAt: Date
    deletedAt?: Date
  }
  user: {
    id: string
    name: string
    createdAt: Date
    deletedAt?: Date
  }
  createdAt: Date
  deletedAt?: Date
}

import * as pg from 'pg'
import { DB, DBConnection, DBClientLocator } from '@db'
import { ChatMessage } from '@entity'

/**
 * ChatMessages repository
 */
export interface ChatMessages {
  insert(
    connection: DBConnection,
    chatMessage: ChatMessage
  ): Promise<ChatMessage>
  
  update(
    connection: DBConnection,
    chatMessage: ChatMessage
  ): Promise<number>
  
  selectById(
    connection: DBConnection,
    id: string
  ): Promise<ChatMessage | undefined>
  
  selectByIds(
    connection: DBConnection,
    ids: string[]
  ): Promise<ChatMessage[]>
  
  selectAll(
    connection: DBConnection,
    sortField: 'id' | 'chatId' | 'userId' | 'content' | 'createdAt' | 'deletedAt',
    sortDirection: 'asc' | 'desc' | 'asc nulls first' | 'desc nulls first',
    offset: number,
    limit: number | 'all'
  ): Promise<ChatMessage[]>
}

export function makeChatMessages(db: DB): ChatMessages {
  return new ChatMessagesImpl(db)
}

/**
 * ChatMessages repository implementation
 */
export class ChatMessagesImpl implements ChatMessages {
  constructor(private readonly clientLocator: DBClientLocator) {}
  
  /*
  create table if not exists "ChatMessages" (
    "id" text primary key,
    "chatId" text not null,
    "userId" text not null,
    "content" text not null,
    "createdAt" timestamptz not null,
    "deletedAt" timestamptz
  )
  */
  
  public static chatMessageRowMapping(row: pg.QueryResultRow): ChatMessage {
    return {
      id: row.id,
      chatId: row.chatId,
      userId: row.userId,
      content: row.content,
      createdAt: row.createdAt,
      deletedAt: row.deletedAt
    }
  }
  
  public static chatMessageParamsMapping(chatMessage: Partial<ChatMessage>): any[] {
    const params: any[] = []
    if (chatMessage.id != null) params.push(chatMessage.id)
    params.push(
      chatMessage.chatId,
      chatMessage.userId,
      chatMessage.content,
      chatMessage.createdAt,
      chatMessage.deletedAt
    )
    return params
  }
  
  //
  // ChatMessages repository methods implementation
  //
  
  async insert(
    connection: DBConnection,
    chatMessage: ChatMessage
  ): Promise<ChatMessage> {
    const sql = `
      insert into "ChatMessages" (
        "id",
        "chatId",
        "userId",
        "content",
        "createdAt",
        "deletedAt"
      )
      values ($1, $2, $3, $4, $5, $6)
    `
    
    const params: any[] = ChatMessagesImpl.chatMessageParamsMapping(chatMessage)
    
    const client = await this.clientLocator.ensureClient(connection)
    const res = await client.query(sql, params)
    return {
      ...chatMessage
    }
  }
  
  async update(
    connection: DBConnection,
    chatMessage: ChatMessage
  ): Promise<number> {
    const sql = `
      update "ChatMessages" set
        "chatId" = $2,
        "userId" = $3,
        "content" = $4,
        "createdAt" = $5,
        "deletedAt" = $6
      where "id" = $1
    `
    
    const params: any[] = ChatMessagesImpl.chatMessageParamsMapping(chatMessage)
    
    const client = await this.clientLocator.ensureClient(connection)
    const res = await client.query(sql, params)
    return res.rowCount
  }
  
  async selectById(
    connection: DBConnection,
    id: string
  ): Promise<ChatMessage | undefined> {
    const sql = `
      select * from "ChatMessages" where "id" = $1
    `
    
    const params: any[] = [id]
    
    const client = await this.clientLocator.ensureClient(connection)
    const res = await client.query(sql, params)
    return res.rows.map(ChatMessagesImpl.chatMessageRowMapping).shift()
  }
  
  async selectByIds(
    connection: DBConnection,
    ids: string[]
  ): Promise<ChatMessage[]> {
    const sql = `
      select * from "ChatMessages" where "id" = any($1)
    `
    
    const params: any[] = [ids]
    
    const client = await this.clientLocator.ensureClient(connection)
    const res = await client.query(sql, params)
    return res.rows.map(ChatMessagesImpl.chatMessageRowMapping)
  }
  
  async selectAll(
    connection: DBConnection,
    sortField: 'id' | 'chatId' | 'userId' | 'content' | 'createdAt' | 'deletedAt',
    sortDirection: 'asc' | 'desc' | 'asc nulls first' | 'desc nulls first',
    offset: number,
    limit: number | 'all'
  ): Promise<ChatMessage[]> {
    const sql = `
      select * from "ChatMessages"
      order by "${sortField}" ${sortDirection}
      ${['asc', 'desc'].includes(sortDirection) ? 'nulls last' : ''}
      limit ${limit} offset ${offset}
    `
    
    const params: any[] = []
    
    const client = await this.clientLocator.ensureClient(connection)
    const res = await client.query(sql, params)
    return res.rows.map(ChatMessagesImpl.chatMessageRowMapping)
  }
}

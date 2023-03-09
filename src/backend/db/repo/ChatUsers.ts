import * as pg from 'pg'
import { DB, DBConnection, DBClientLocator } from '@db'
import { ChatUser } from '@entity'

/**
 * ChatUsers repository
 */
export interface ChatUsers {
  insert(
    connection: DBConnection,
    chatUser: ChatUser
  ): Promise<ChatUser>
  
  update(
    connection: DBConnection,
    chatUser: ChatUser
  ): Promise<number>
  
  selectById(
    connection: DBConnection,
    chatId: string
  ): Promise<ChatUser | undefined>
  
  selectByIds(
    connection: DBConnection,
    chatIds: string[]
  ): Promise<ChatUser[]>
  
  selectAll(
    connection: DBConnection,
    sortField: 'chatId' | 'userId' | 'createdAt' | 'deletedAt',
    sortDirection: 'asc' | 'desc' | 'asc nulls first' | 'desc nulls first',
    offset: number,
    limit: number | 'all'
  ): Promise<ChatUser[]>
}

export function makeChatUsers(db: DB): ChatUsers {
  return new ChatUsersImpl(db)
}

/**
 * ChatUsers repository implementation
 */
export class ChatUsersImpl implements ChatUsers {
  constructor(private readonly clientLocator: DBClientLocator) {}
  
  /*
  create table if not exists "ChatUsers" (
    "chatId" text primary key,
    "userId" text not null,
    "createdAt" timestamptz not null,
    "deletedAt" timestamptz
  )
  */
  
  public static chatUserRowMapping(row: pg.QueryResultRow): ChatUser {
    return {
      chatId: row.chatId,
      userId: row.userId,
      createdAt: row.createdAt,
      deletedAt: row.deletedAt
    }
  }
  
  public static chatUserParamsMapping(chatUser: Partial<ChatUser>): any[] {
    const params: any[] = []
    if (chatUser.chatId != null) params.push(chatUser.chatId)
    params.push(
      chatUser.userId,
      chatUser.createdAt,
      chatUser.deletedAt
    )
    return params
  }
  
  //
  // ChatUsers repository methods implementation
  //
  
  async insert(
    connection: DBConnection,
    chatUser: ChatUser
  ): Promise<ChatUser> {
    const sql = `
      insert into "ChatUsers" (
        "chatId",
        "userId",
        "createdAt",
        "deletedAt"
      )
      values ($1, $2, $3, $4)
    `
    
    const params: any[] = ChatUsersImpl.chatUserParamsMapping(chatUser)
    
    const client = await this.clientLocator.ensureClient(connection)
    const res = await client.query(sql, params)
    return {
      ...chatUser
    }
  }
  
  async update(
    connection: DBConnection,
    chatUser: ChatUser
  ): Promise<number> {
    const sql = `
      update "ChatUsers" set
        "userId" = $2,
        "createdAt" = $3,
        "deletedAt" = $4
      where "chatId" = $1
    `
    
    const params: any[] = ChatUsersImpl.chatUserParamsMapping(chatUser)
    
    const client = await this.clientLocator.ensureClient(connection)
    const res = await client.query(sql, params)
    return res.rowCount
  }
  
  async selectById(
    connection: DBConnection,
    chatId: string
  ): Promise<ChatUser | undefined> {
    const sql = `
      select * from "ChatUsers" where "chatId" = $1
    `
    
    const params: any[] = [chatId]
    
    const client = await this.clientLocator.ensureClient(connection)
    const res = await client.query(sql, params)
    return res.rows.map(ChatUsersImpl.chatUserRowMapping).shift()
  }
  
  async selectByIds(
    connection: DBConnection,
    chatIds: string[]
  ): Promise<ChatUser[]> {
    const sql = `
      select * from "ChatUsers" where "chatId" = any($1)
    `
    
    const params: any[] = [chatIds]
    
    const client = await this.clientLocator.ensureClient(connection)
    const res = await client.query(sql, params)
    return res.rows.map(ChatUsersImpl.chatUserRowMapping)
  }
  
  async selectAll(
    connection: DBConnection,
    sortField: 'chatId' | 'userId' | 'createdAt' | 'deletedAt',
    sortDirection: 'asc' | 'desc' | 'asc nulls first' | 'desc nulls first',
    offset: number,
    limit: number | 'all'
  ): Promise<ChatUser[]> {
    const sql = `
      select * from "ChatUsers"
      order by "${sortField}" ${sortDirection}
      ${['asc', 'desc'].includes(sortDirection) ? 'nulls last' : ''}
      limit ${limit} offset ${offset}
    `
    
    const params: any[] = []
    
    const client = await this.clientLocator.ensureClient(connection)
    const res = await client.query(sql, params)
    return res.rows.map(ChatUsersImpl.chatUserRowMapping)
  }
}

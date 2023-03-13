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
    id: string
  ): Promise<ChatUser | undefined>
  
  selectByIds(
    connection: DBConnection,
    ids: string[]
  ): Promise<ChatUser[]>
  
  selectAll(
    connection: DBConnection,
    sortField: 'id' | 'chatId' | 'userId' | 'createdAt' | 'deletedAt',
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
    "id" text primary key,
    "chatId" text not null,
    "userId" text not null,
    "createdAt" timestamptz not null,
    "deletedAt" timestamptz
  )
  */
  
  public static chatUserRowMapping(row: pg.QueryResultRow): ChatUser {
    return {
      id: row.id,
      chatId: row.chatId,
      userId: row.userId,
      createdAt: row.createdAt,
      deletedAt: row.deletedAt
    }
  }
  
  public static chatUserParamsMapping(chatUser: Partial<ChatUser>): any[] {
    const params: any[] = []
    if (chatUser.id != null) params.push(chatUser.id)
    params.push(
      chatUser.chatId,
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
        "id",
        "chatId",
        "userId",
        "createdAt",
        "deletedAt"
      )
      values ($1, $2, $3, $4, $5)
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
        "chatId" = $2,
        "userId" = $3,
        "createdAt" = $4,
        "deletedAt" = $5
      where "id" = $1
    `
    
    const params: any[] = ChatUsersImpl.chatUserParamsMapping(chatUser)
    
    const client = await this.clientLocator.ensureClient(connection)
    const res = await client.query(sql, params)
    return res.rowCount
  }
  
  async selectById(
    connection: DBConnection,
    id: string
  ): Promise<ChatUser | undefined> {
    const sql = `
      select * from "ChatUsers" where "id" = $1
    `
    
    const params: any[] = [id]
    
    const client = await this.clientLocator.ensureClient(connection)
    const res = await client.query(sql, params)
    return res.rows.map(ChatUsersImpl.chatUserRowMapping).shift()
  }
  
  async selectByIds(
    connection: DBConnection,
    ids: string[]
  ): Promise<ChatUser[]> {
    const sql = `
      select * from "ChatUsers" where "id" = any($1)
    `
    
    const params: any[] = [ids]
    
    const client = await this.clientLocator.ensureClient(connection)
    const res = await client.query(sql, params)
    return res.rows.map(ChatUsersImpl.chatUserRowMapping)
  }
  
  async selectAll(
    connection: DBConnection,
    sortField: 'id' | 'chatId' | 'userId' | 'createdAt' | 'deletedAt',
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

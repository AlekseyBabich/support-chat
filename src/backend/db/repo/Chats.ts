import * as pg from 'pg'
import { DB, DBConnection, DBClientLocator } from '@db'
import { Chat } from '@entity'

/**
 * Chats repository
 */
export interface Chats {
  insert(
    connection: DBConnection,
    chat: Chat
  ): Promise<Chat>
  
  update(
    connection: DBConnection,
    chat: Chat
  ): Promise<number>
  
  selectById(
    connection: DBConnection,
    id: string
  ): Promise<Chat | undefined>
  
  selectByIds(
    connection: DBConnection,
    ids: string[]
  ): Promise<Chat[]>
  
  selectAll(
    connection: DBConnection,
    sortField: 'id' | 'userId' | 'name' | 'createdAt' | 'deletedAt',
    sortDirection: 'asc' | 'desc' | 'asc nulls first' | 'desc nulls first',
    offset: number,
    limit: number | 'all'
  ): Promise<Chat[]>
}

export function makeChats(db: DB): Chats {
  return new ChatsImpl(db)
}

/**
 * Chats repository implementation
 */
export class ChatsImpl implements Chats {
  constructor(private readonly clientLocator: DBClientLocator) {}
  
  /*
  create table if not exists "Chats" (
    "id" text primary key,
    "userId" text not null,
    "name" text not null,
    "createdAt" timestamptz not null,
    "deletedAt" timestamptz
  )
  */
  
  public static chatRowMapping(row: pg.QueryResultRow): Chat {
    return {
      id: row.id,
      userId: row.userId,
      name: row.name,
      createdAt: row.createdAt,
      deletedAt: row.deletedAt
    }
  }
  
  public static chatParamsMapping(chat: Partial<Chat>): any[] {
    const params: any[] = []
    if (chat.id != null) params.push(chat.id)
    params.push(
      chat.userId,
      chat.name,
      chat.createdAt,
      chat.deletedAt
    )
    return params
  }
  
  //
  // Chats repository methods implementation
  //
  
  async insert(
    connection: DBConnection,
    chat: Chat
  ): Promise<Chat> {
    const sql = `
      insert into "Chats" (
        "id",
        "userId",
        "name",
        "createdAt",
        "deletedAt"
      )
      values ($1, $2, $3, $4, $5)
    `
    
    const params: any[] = ChatsImpl.chatParamsMapping(chat)
    
    const client = await this.clientLocator.ensureClient(connection)
    const res = await client.query(sql, params)
    return {
      ...chat
    }
  }
  
  async update(
    connection: DBConnection,
    chat: Chat
  ): Promise<number> {
    const sql = `
      update "Chats" set
        "userId" = $2,
        "name" = $3,
        "createdAt" = $4,
        "deletedAt" = $5
      where "id" = $1
    `
    
    const params: any[] = ChatsImpl.chatParamsMapping(chat)
    
    const client = await this.clientLocator.ensureClient(connection)
    const res = await client.query(sql, params)
    return res.rowCount
  }
  
  async selectById(
    connection: DBConnection,
    id: string
  ): Promise<Chat | undefined> {
    const sql = `
      select * from "Chats" where "id" = $1
    `
    
    const params: any[] = [id]
    
    const client = await this.clientLocator.ensureClient(connection)
    const res = await client.query(sql, params)
    return res.rows.map(ChatsImpl.chatRowMapping).shift()
  }
  
  async selectByIds(
    connection: DBConnection,
    ids: string[]
  ): Promise<Chat[]> {
    const sql = `
      select * from "Chats" where "id" = any($1)
    `
    
    const params: any[] = [ids]
    
    const client = await this.clientLocator.ensureClient(connection)
    const res = await client.query(sql, params)
    return res.rows.map(ChatsImpl.chatRowMapping)
  }
  
  async selectAll(
    connection: DBConnection,
    sortField: 'id' | 'userId' | 'name' | 'createdAt' | 'deletedAt',
    sortDirection: 'asc' | 'desc' | 'asc nulls first' | 'desc nulls first',
    offset: number,
    limit: number | 'all'
  ): Promise<Chat[]> {
    const sql = `
      select * from "Chats"
      order by "${sortField}" ${sortDirection}
      ${['asc', 'desc'].includes(sortDirection) ? 'nulls last' : ''}
      limit ${limit} offset ${offset}
    `
    
    const params: any[] = []
    
    const client = await this.clientLocator.ensureClient(connection)
    const res = await client.query(sql, params)
    return res.rows.map(ChatsImpl.chatRowMapping)
  }
}

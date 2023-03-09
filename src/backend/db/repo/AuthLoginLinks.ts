import * as pg from 'pg'
import { DB, DBConnection, DBClientLocator } from '@db'
import { AuthLoginLink } from '@entity'

/**
 * AuthLoginLinks repository
 */
export interface AuthLoginLinks {
  insert(
    connection: DBConnection,
    authLoginLink: AuthLoginLink
  ): Promise<AuthLoginLink>
  
  update(
    connection: DBConnection,
    authLoginLink: AuthLoginLink
  ): Promise<number>
  
  selectById(
    connection: DBConnection,
    id: string
  ): Promise<AuthLoginLink | undefined>
  
  selectByIds(
    connection: DBConnection,
    ids: string[]
  ): Promise<AuthLoginLink[]>
  
  selectAll(
    connection: DBConnection,
    sortField: 'id' | 'userId' | 'createdAt' | 'activatedAt' | 'expireAt',
    sortDirection: 'asc' | 'desc' | 'asc nulls first' | 'desc nulls first',
    offset: number,
    limit: number | 'all'
  ): Promise<AuthLoginLink[]>
}

export function makeAuthLoginLinks(db: DB): AuthLoginLinks {
  return new AuthLoginLinksImpl(db)
}

/**
 * AuthLoginLinks repository implementation
 */
export class AuthLoginLinksImpl implements AuthLoginLinks {
  constructor(private readonly clientLocator: DBClientLocator) {}
  
  /*
  create table if not exists "AuthLoginLinks" (
    "id" text primary key,
    "userId" text not null,
    "createdAt" timestamptz not null,
    "activatedAt" timestamptz,
    "expireAt" timestamptz not null
  )
  */
  
  public static authLoginLinkRowMapping(row: pg.QueryResultRow): AuthLoginLink {
    return {
      id: row.id,
      userId: row.userId,
      createdAt: row.createdAt,
      activatedAt: row.activatedAt,
      expireAt: row.expireAt
    }
  }
  
  public static authLoginLinkParamsMapping(authLoginLink: Partial<AuthLoginLink>): any[] {
    const params: any[] = []
    if (authLoginLink.id != null) params.push(authLoginLink.id)
    params.push(
      authLoginLink.userId,
      authLoginLink.createdAt,
      authLoginLink.activatedAt,
      authLoginLink.expireAt
    )
    return params
  }
  
  //
  // AuthLoginLinks repository methods implementation
  //
  
  async insert(
    connection: DBConnection,
    authLoginLink: AuthLoginLink
  ): Promise<AuthLoginLink> {
    const sql = `
      insert into "AuthLoginLinks" (
        "id",
        "userId",
        "createdAt",
        "activatedAt",
        "expireAt"
      )
      values ($1, $2, $3, $4, $5)
    `
    
    const params: any[] = AuthLoginLinksImpl.authLoginLinkParamsMapping(authLoginLink)
    
    const client = await this.clientLocator.ensureClient(connection)
    const res = await client.query(sql, params)
    return {
      ...authLoginLink
    }
  }
  
  async update(
    connection: DBConnection,
    authLoginLink: AuthLoginLink
  ): Promise<number> {
    const sql = `
      update "AuthLoginLinks" set
        "userId" = $2,
        "createdAt" = $3,
        "activatedAt" = $4,
        "expireAt" = $5
      where "id" = $1
    `
    
    const params: any[] = AuthLoginLinksImpl.authLoginLinkParamsMapping(authLoginLink)
    
    const client = await this.clientLocator.ensureClient(connection)
    const res = await client.query(sql, params)
    return res.rowCount
  }
  
  async selectById(
    connection: DBConnection,
    id: string
  ): Promise<AuthLoginLink | undefined> {
    const sql = `
      select * from "AuthLoginLinks" where "id" = $1
    `
    
    const params: any[] = [id]
    
    const client = await this.clientLocator.ensureClient(connection)
    const res = await client.query(sql, params)
    return res.rows.map(AuthLoginLinksImpl.authLoginLinkRowMapping).shift()
  }
  
  async selectByIds(
    connection: DBConnection,
    ids: string[]
  ): Promise<AuthLoginLink[]> {
    const sql = `
      select * from "AuthLoginLinks" where "id" = any($1)
    `
    
    const params: any[] = [ids]
    
    const client = await this.clientLocator.ensureClient(connection)
    const res = await client.query(sql, params)
    return res.rows.map(AuthLoginLinksImpl.authLoginLinkRowMapping)
  }
  
  async selectAll(
    connection: DBConnection,
    sortField: 'id' | 'userId' | 'createdAt' | 'activatedAt' | 'expireAt',
    sortDirection: 'asc' | 'desc' | 'asc nulls first' | 'desc nulls first',
    offset: number,
    limit: number | 'all'
  ): Promise<AuthLoginLink[]> {
    const sql = `
      select * from "AuthLoginLinks"
      order by "${sortField}" ${sortDirection}
      ${['asc', 'desc'].includes(sortDirection) ? 'nulls last' : ''}
      limit ${limit} offset ${offset}
    `
    
    const params: any[] = []
    
    const client = await this.clientLocator.ensureClient(connection)
    const res = await client.query(sql, params)
    return res.rows.map(AuthLoginLinksImpl.authLoginLinkRowMapping)
  }
}

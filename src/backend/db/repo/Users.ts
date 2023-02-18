import * as pg from 'pg'
import { DB, DBConnection, DBClientLocator } from '@db'
import { User } from '@entity'

/**
 * Users repository
 */
export interface Users {
  insert(
      connection: DBConnection,
      user: User
  ): Promise<User>

  update(
      connection: DBConnection,
      user: User
  ): Promise<number>

  selectById(
      connection: DBConnection,
      id: string
  ): Promise<User | undefined>

  selectByIds(
      connection: DBConnection,
      ids: string[]
  ): Promise<User[]>

  selectAll(
      connection: DBConnection,
      sortField: 'id' | 'createdAt' | 'deletedAt',
      sortDirection: 'asc' | 'desc' | 'asc nulls first' | 'desc nulls first',
      offset: number,
      limit: number | 'all'
  ): Promise<User[]>
}

export function makeUsers(db: DB): Users {
  return new UsersImpl(db)
}

/**
 * Users repository implementation
 */
export class UsersImpl implements Users {
  constructor(private readonly clientLocator: DBClientLocator) {}

  /*
  create table if not exists "Users" (
    "id" text primary key,
    "createdAt" timestamptz not null,
    "deletedAt" timestamptz
  )
  */

  public static userRowMapping(row: pg.QueryResultRow): User {
    return {
      id: row.id,
      createdAt: row.createdAt,
      deletedAt: row.deletedAt
    }
  }

  public static userParamsMapping(user: Partial<User>): any[] {
    const params: any[] = []
    if (user.id != null) params.push(user.id)
    params.push(
        user.createdAt,
        user.deletedAt
    )
    return params
  }

  //
  // Users repository methods implementation
  //

  async insert(
      connection: DBConnection,
      user: User
  ): Promise<User> {
    const sql = `
      insert into "Users" (
        "id",
        "createdAt",
        "deletedAt"
      )
      values ($1, $2, $3)
    `

    const params: any[] = UsersImpl.userParamsMapping(user)

    const client = await this.clientLocator.ensureClient(connection)
    const res = await client.query(sql, params)
    return {
      ...user
    }
  }

  async update(
      connection: DBConnection,
      user: User
  ): Promise<number> {
    const sql = `
      update "Users" set
                       "createdAt" = $2,
                       "deletedAt" = $3
      where "id" = $1
    `

    const params: any[] = UsersImpl.userParamsMapping(user)

    const client = await this.clientLocator.ensureClient(connection)
    const res = await client.query(sql, params)
    return res.rowCount
  }

  async selectById(
      connection: DBConnection,
      id: string
  ): Promise<User | undefined> {
    const sql = `
      select * from "Users" where "id" = $1
    `

    const params: any[] = [id]

    const client = await this.clientLocator.ensureClient(connection)
    const res = await client.query(sql, params)
    return res.rows.map(UsersImpl.userRowMapping).shift()
  }

  async selectByIds(
      connection: DBConnection,
      ids: string[]
  ): Promise<User[]> {
    const sql = `
      select * from "Users" where "id" = any($1)
    `

    const params: any[] = [ids]

    const client = await this.clientLocator.ensureClient(connection)
    const res = await client.query(sql, params)
    return res.rows.map(UsersImpl.userRowMapping)
  }

  async selectAll(
      connection: DBConnection,
      sortField: 'id' | 'createdAt' | 'deletedAt',
      sortDirection: 'asc' | 'desc' | 'asc nulls first' | 'desc nulls first',
      offset: number,
      limit: number | 'all'
  ): Promise<User[]> {
    const sql = `
      select * from "Users"
      order by "${sortField}" ${sortDirection}
               ${['asc', 'desc'].includes(sortDirection) ? 'nulls last' : ''}
      limit ${limit} offset ${offset}
    `

    const params: any[] = []

    const client = await this.clientLocator.ensureClient(connection)
    const res = await client.query(sql, params)
    return res.rows.map(UsersImpl.userRowMapping)
  }
}

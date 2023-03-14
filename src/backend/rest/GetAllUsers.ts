import {ExtendableContext} from "koa";
import {Pool} from "pg";
import backend from "@config/backend";
import {makeDB} from "@db";
import { makeUsers } from "@db/repo";

const dbPool = new Pool(backend.db)
const db = makeDB(dbPool)
const users = makeUsers(db)

export function GetAllUsers(){
  return async (ctx: ExtendableContext) => {

    await db.withTransaction( async (con) => {
      const allUsers = await users.selectAll(con, 'name', 'asc', 0, 'all')

      if(!allUsers){
        ctx.body = {
          body: 'no users',
          status_code: ctx.status
        }
        return 'error'
      }

      ctx.body = allUsers
      return 'ok'
    })
    return;
  }
}

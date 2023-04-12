import { DefaultState, ExtendableContext } from "koa";
import {Pool} from "pg";
import backend from "@config/backend";
import {makeDB} from "@db";
import { makeUsers } from "@db/repo";

const dbPool = new Pool(backend.db)
const db = makeDB(dbPool)
const users = makeUsers(db)

export function GetAllUsers(){
  return async (ctx: ExtendableContext & {state: DefaultState}) => {
    const userId = ctx.state.user.user_metadata.chat_user_id

    await db.withTransaction( async (con) => {
      let allUsers = await users.selectAll(con, 'name', 'asc', 0, 'all')

      if(!allUsers){
        ctx.body = {
          body: 'no users',
          status_code: ctx.status
        }
        return 'error'
      }

      allUsers = allUsers.filter((item) => { return item.id != userId })

      ctx.body = allUsers
      return 'ok'
    })
    return;
  }
}

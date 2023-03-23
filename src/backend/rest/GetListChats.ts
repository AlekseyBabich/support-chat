import { DefaultState, ExtendableContext } from "koa";
import {Pool} from "pg";
import backend from "@config/backend";
import {makeDB} from "@db";
import { makeChatUsers } from "@db/repo";

const dbPool = new Pool(backend.db)
const db = makeDB(dbPool)
const chatUsers = makeChatUsers(db)


export function GetListChats() {
  return async (ctx: ExtendableContext & {state: DefaultState}) => {
    const userId = ctx.state.user.user_metadata.chat_user_id

    await db.withTransaction(async (con) => {
      ctx.body = await chatUsers.selectByUserId(con, userId)
      return 'ok'
    })
    return
  }
}

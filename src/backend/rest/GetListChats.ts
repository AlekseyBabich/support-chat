import {ExtendableContext} from "koa";
import {Pool} from "pg";
import backend from "@config/backend";
import {makeDB} from "@db";
import { makeChatUsers, makeUsers } from "@db/repo";

const dbPool = new Pool(backend.db)
const db = makeDB(dbPool)
const users = makeUsers(db)
const chatUsers = makeChatUsers(db)


export function GetListChats() {
  return async (ctx: ExtendableContext) => {
    const userId: string = ctx.request.query.userId as string;

    if(!userId) {
      ctx.body = ({
        body: 'no userId',
        status_code: ctx.status
      });
      return 'error';
    }

    await db.withTransaction(async (con) => {
      const user = await users.selectById(con, userId)
      if(!user){
        ctx.body = {
          body: 'no this user',
          status_code: ctx.status
        }
        return 'error'
      }

      ctx.body = await chatUsers.selectByUserId(con, userId)
      return 'ok'
    })
    return
  }
}

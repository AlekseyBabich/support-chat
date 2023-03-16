import {ExtendableContext} from "koa";
import {Pool} from "pg";
import backend from "@config/backend";
import {makeDB} from "@db";
import { makeUsers } from "@db/repo";
import { createClient } from "@supabase/supabase-js";

const dbPool = new Pool(backend.db)
const db = makeDB(dbPool)
const users = makeUsers(db)
const supabase = createClient(backend.db.supabaseUrl, backend.db.serviseRoleKey)


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

      const { data } = await supabase
        .from('ChatUsers')
        .select()
        .eq('userId', userId)

      ctx.body = data
      return 'ok'
    })
    return
  }
}

import {ExtendableContext} from "koa";
import {Pool} from "pg";
import backend from "@config/backend";
import {makeDB} from "@db";
import {makeUsers} from "@db/repo";
import { createClient } from '@supabase/supabase-js';
import {v4 as uuid} from "@lukeed/uuid/secure";

const supabase = createClient(backend.db.supabaseUrl, backend.db.serviseRoleKey)
const dbPool = new Pool(backend.db)
const db = makeDB(dbPool)
const users = makeUsers(db)

export function SignUp(){
    return async (ctx: ExtendableContext) => {
        await db.withTransaction( async (con) => {
            const userId = uuid()

            await supabase.auth.admin.createUser({
                email: `user-${userId}@email.com`,
                password: `user-${userId}pas`,
                user_metadata: { chat_user: `user:${userId}` },
                email_confirm: true,
            })

            ctx.body = await users.insert(con, {
                id: userId,
                createdAt: new Date()
            })
            return 'ok'
        })
        return;
    }
}

import {ExtendableContext} from "koa";
import {Pool} from "pg";
import backend from "@config/backend";
import {makeDB} from "@db";
import {makeUsers} from "@db/repo";
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(backend.db.supabaseUrl, backend.db.serviseRoleKey)
const dbPool = new Pool(backend.db)
const db = makeDB(dbPool)
const users = makeUsers(db)

export function SignUp(){
    return async (ctx: ExtendableContext) => {
        await db.withTransaction( async (con) => {
            const { data } = await supabase.auth.signUp({
                email: `user-${Math.random() + 1}@chat.com`,
                password: `Pa$$w0Rd#user-${Math.random() + 1}pA$$w0rD!`,
            })

            ctx.body = await users.insert(con, {
                id: String(data.user?.id),
                createdAt: new Date()
            })

            return 'ok'
        })
        return;
    }
}

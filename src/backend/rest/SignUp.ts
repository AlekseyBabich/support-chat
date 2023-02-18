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
            const uniqueNumber = Math.floor(Math.random() * 100000)
            const { data } = await supabase.auth.signUp({
                email: `user-${uniqueNumber}@email.com`,
                password: `user-${uniqueNumber}pas`,
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

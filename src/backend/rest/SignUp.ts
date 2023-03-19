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

interface SignUp{
    userName: string;
}

export function SignUp(){
    return async (ctx: ExtendableContext) => {
        const body = <SignUp>ctx.request.body;

        if(!body.userName){
            ctx.body = ({
                body: 'no userName',
                status_code: ctx.status
            });
            return 'error';
        }

        await db.withTransaction( async (con) => {
            const { data } = await supabase
              .from('Users')
              .select()
              .eq('name', body.userName)
              .single()

            if(data){
                ctx.body = {
                    body: 'A user with that name already exists',
                    status_code: ctx.status
                }
                return 'error'
            }
            const userId = uuid()

            await supabase.auth.admin.createUser({
                email: `user-${userId}@email.com`,
                password: `user-${userId}pas`,
                user_metadata: { chat_user_id: `${userId}` },
                email_confirm: true,
            })

            ctx.body = await users.insert(con, {
                id: userId,
                name: body.userName,
                createdAt: new Date()
            })
            return 'ok'
        })
        return;
    }
}

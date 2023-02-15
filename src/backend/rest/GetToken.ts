import {ExtendableContext} from "koa";
import {Pool} from "pg";
import backend from "@config/backend";
import {makeDB} from "@db";
import {makeAuthLoginLinks, makeUsers} from "@db/repo";
import {createClient} from "@supabase/supabase-js";

const dbPool = new Pool(backend.db)
const db = makeDB(dbPool)
const authLoginLinks = makeAuthLoginLinks(db)
const users = makeUsers(db)
const supabase = createClient(backend.db.supabaseUrl, backend.db.serviseRoleKey)

export function GetToken(){
    return async (ctx: ExtendableContext) => {
        const authLoginLinkId: string = ctx.request.query.authLoginLinkId as string;

        if(authLoginLinkId){
            await db.withTransaction( async (con) => {
                const authLoginLink = await authLoginLinks.selectById(con, authLoginLinkId)
                const refreshToken = await supabase.from('auth_refresh_tokens').select().eq('user_id', authLoginLink?.userId)
                ctx.body = ({ 'refreshToken': refreshToken })
                return 'ok'
            })
            return;
        }
        ctx.body = ({ 'body': 'no authLoginLinkId' });
        return;
    }
}

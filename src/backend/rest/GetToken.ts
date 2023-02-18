import {ExtendableContext} from "koa";
import {Pool} from "pg";
import backend from "@config/backend";
import {makeDB} from "@db";
import {makeAuthLoginLinks} from "@db/repo";
import {createClient} from "@supabase/supabase-js";

const dbPool = new Pool(backend.db)
const db = makeDB(dbPool)
const authLoginLinks = makeAuthLoginLinks(db)
const supabase = createClient(backend.db.supabaseUrl, backend.db.serviseRoleKey)

export function GetToken(){
    return async (ctx: ExtendableContext) => {
        const authLoginLinkId: string = ctx.request.query.authLoginLinkId as string;
        if(!authLoginLinkId){
            ctx.body = ({ 'body': 'no authLoginLinkId' });
            return;
        }

        await db.withTransaction( async (con) => {
            const authLoginLink = await authLoginLinks.selectById(con, authLoginLinkId)
            if(!authLoginLink){
                ctx.body = 'no authLoginLink'
                return
            }

            const user  = await supabase.auth.admin.getUserById(authLoginLink.userId)

            const email: string = user.data.user?.email as string
            const leftBorder = email.indexOf('-')
            const rightBorder = email.indexOf('@')
            const uniqueNumber = email.slice(leftBorder + 1, rightBorder)

            const { data, error } = await supabase.auth.signInWithPassword({
                email: email,
                password: `user-${uniqueNumber}pas`,
            })

            ctx.body = {
                accessToken: data.session?.access_token,
                refreshToken: data.session?.refresh_token
            }
            return 'ok'
        })
        return;
    }
}

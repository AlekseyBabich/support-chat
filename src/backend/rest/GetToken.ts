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
            ctx.body = ({
                body: 'no authLoginLinkId',
                status_code: ctx.status
            });
            return;
        }

        await db.withTransaction( async (con) => {
            const authLoginLink = await authLoginLinks.selectById(con, authLoginLinkId)
            if(!authLoginLink){
                ctx.body = {
                    body: 'no authLoginLink',
                    status_code: ctx.status
                }
                return 'error'
            }

            if(authLoginLink.expireAt < new Date()){
                ctx.body = {
                    body: 'link expired',
                    status_code: ctx.status
                }
                return 'error'
            }

            const response = await fetch(
              new URL('/auth/v1/token?grant_type=password', backend.db.supabaseUrl),
              {
                  headers: {
                      'Content-Type': 'application/json',
                      'apikey': backend.db.serviseRoleKey
                  },
                  keepalive: false,
                  method: 'POST',
                  body: JSON.stringify({ email:  `user-${authLoginLink.userId}@email.com`, password: `user-${authLoginLink.userId}pas` })
              }
            )

            const data = await response.json()
            if (response.status != 200)
                ctx.body = { body: 'authenticationError'}
            ctx.body = {
                accessToken: data.access_token,
                refreshToken: data.refresh_token
            }

            await supabase
              .from('AuthLoginLinks')
              .update({ activatedAt: new Date()})
              .eq('id', authLoginLinkId)

            return 'ok'
        })
        return;
    }
}

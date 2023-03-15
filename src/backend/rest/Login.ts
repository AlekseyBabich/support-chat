import {ExtendableContext} from "koa";
import {v4 as uuid} from "@lukeed/uuid/secure";
import {Pool} from "pg";
import backend from "@config/backend";
import {makeDB} from "@db";
import { makeAuthLoginLinks } from "@db/repo";
import { addSeconds } from 'date-fns';
import { createClient } from "@supabase/supabase-js";

const dbPool = new Pool(backend.db)
const db = makeDB(dbPool)
const authLoginLinks = makeAuthLoginLinks(db)
const supabase = createClient(backend.db.supabaseUrl, backend.db.serviseRoleKey)

interface Login{
  userName: string;
}

export function Login(){
  return async (ctx: ExtendableContext) => {
    const body = <Login>ctx.request.body;

    if(!body.userName){
      ctx.body = ({
        body: 'no userName',
        status_code: ctx.status
      });
      return 'error';
    }
    const authLoginLinkId = uuid()

    await db.withTransaction( async (con) => {
      const { data, error } = await supabase
        .from('Users')
        .select()
        .eq('name', body.userName)
        .single()

      if(error){
        ctx.body = {
          body: 'no this user',
          status_code: ctx.status
        }
        return 'error'
      }

      const authLoginLink = await authLoginLinks.insert(con, {
        id: authLoginLinkId,
        userId: data.id,
        createdAt: new Date(),
        expireAt: addSeconds(new Date(), 45)
      })

      ctx.body = {
        body: `${backend.frontendURL}/loginLink?authLoginLinkId=${authLoginLink.id}`,
        userId: data.id
      }
      return 'ok'
    })
    return;
  }
}

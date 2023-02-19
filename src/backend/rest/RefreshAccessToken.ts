import {ExtendableContext} from "koa";
import backend from "@config/backend";

interface RefreshAccessToken{
  refreshToken: string;
}

export function RefreshAccessToken(){
  return async (ctx: ExtendableContext) => {
    const body = <RefreshAccessToken>ctx.request.body;

    const response = await fetch(
      new URL('/auth/v1/token?grant_type=refresh_token', backend.db.supabaseUrl),
      {
        headers: {
          'Content-Type': 'application/json',
          'apikey':  backend.db.serviseRoleKey
        },
        keepalive: false,
        method: 'POST',
        body: JSON.stringify({ refresh_token: body.refreshToken })
      }
    )
    const data = await response.json()

    data.status = response.status
    ctx.body = data

    return 'ok'
  }
}

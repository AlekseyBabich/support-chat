import { Middleware } from 'koa'
import cors from '@koa/cors'
import config from '@config'

export default function Cors(): Middleware {
    if (config.CORS)
        return cors({
            allowHeaders: ['x-session-id', 'authorization', 'content-type'],
            credentials: () => true
        })
    else
        return (ctx, next) => next()
}

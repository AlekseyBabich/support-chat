import { Middleware } from 'koa'
import cors from '@koa/cors'
import backend from '@config/backend'

export default function Cors(): Middleware {
    if (backend.CORS)
        return cors({
            allowHeaders: ['x-session-id', 'authorization', 'content-type'],
            allowMethods: ["GET,HEAD,PUT,POST,DELETE,PATCH"],
            credentials: () => true
        })
    else
        return (ctx, next) => next()
}

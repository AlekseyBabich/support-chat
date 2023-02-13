import Koa from "koa";
import Router from "koa-router";
import { Pool } from 'pg'
import logger from "koa-logger";
import json from "koa-json";

import Cors from "@cors";
import { makeAuthLoginLinks } from "@db/repo";
import {makeDB} from "@db";
import backend from "@config/backend"

const app = new Koa();
const router = new Router();

const dbPool = new Pool(backend.db)
const db = makeDB(dbPool)
const authLoginLinks = makeAuthLoginLinks(db)

router.get("/", async(ctx, next) => {
    ctx.body = { msg: "Hello, it's Chat Support" };
    await next();
})

router.get("/token", async(ctx) => {
    const authLoginLinkId: string = ctx.request.query.authLoginLinkId as string;
    if(authLoginLinkId){
        ctx.body  = {
            'token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lI' +
                'iwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c',
            'refreshToken': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4' +
                'gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c',
            'authLoginLinkId': authLoginLinkId,
        }

        // await db.withTransaction( async (con) => {
        //     const loginLink = await authLoginLinks.selectById(con, authLoginLinkId)
        //     if(!loginLink){
        //         ctx.body = "doesn't exist"
        //         return 'empty'
        //     }
        //     ctx.body = loginLink
        //     return 'ok'
        // })
        return;
    }
    ctx.body = ({ 'body': 'no authLoginLinkId' });
    return;
})

app.use(Cors());
app.use(json());
app.use(logger());

app.use(router.routes()).use(router.allowedMethods());

app.listen(5100, () => {
    console.log("Koa started in http://localhost:5100 ");
});





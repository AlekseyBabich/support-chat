import Koa from "koa";
import Router from "koa-router";
import logger from "koa-logger";
import json from "koa-json";
import jwt from 'koa-jwt'
import backend from "@config/backend";

import Cors from "@cors";
import {GetToken} from "@src/backend/rest/GetToken";
import {GetAuthLoginLink} from "@src/backend/rest/GetAuthLoginLink";
import {SignUp} from "@src/backend/rest/SignUp";
import bodyParser from "koa-bodyparser";
import { RefreshAccessToken } from "@src/backend/rest/RefreshAccessToken";
import { Login } from "@src/backend/rest/Login";
import { CreateChat } from "@src/backend/rest/CreateChat";
import { AddMessage } from "@src/backend/rest/AddMessage";

const app = new Koa();
const router = new Router();

router
    .get("/token", GetToken())
    .post("/getAuthLoginLink", GetAuthLoginLink())
    .post("/signUp", SignUp())
    .post("/login", Login())
    .post("/refreshAccessToken", RefreshAccessToken())
    .post("/createChat", CreateChat())
    .post("/addMessage", AddMessage())

app.use(Cors());
app.use(json());
app.use(logger());
app.use(bodyParser());

app.use(async (ctx, next) => {
    const jwtHandler = jwt({ secret: backend.jwtSecret, passthrough: false }).unless({
        path: [ "/token", "/getAuthLoginLink", "/signUp", "/login", "/refreshAccessToken" ]
    })
    try {
        await jwtHandler(ctx, next)
    } catch (err: any) {
        let message: string
        ctx.status = err.statusCode || err.status || 500
        if (ctx.status == 500) {
            ctx.log.error({ err })
            message = 'Internal Server Error'
        } else {
            message = err.message || 'Unknown Error'
        }
        ctx.body = { status: 'error', error: { message } }
    }
})

app.use(router.routes()).use(router.allowedMethods());

app.listen(5100, () => {
    console.log("Koa started in http://localhost:5100 ");
});





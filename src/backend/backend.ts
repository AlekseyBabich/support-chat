import Koa from "koa";
import Router from "koa-router";
import logger from "koa-logger";
import json from "koa-json";

import Cors from "@src/backend/koa/cors";

const app = new Koa();
const router = new Router();

router.get("/", async(ctx, next) => {
    ctx.body = { msg: "Hello, it's Chat Support" };
    await next();
})

router.get("/token", async(ctx) => {
    const authLoginLinkId = ctx.request.query.authLoginLinkId;
    if(authLoginLinkId){
        ctx.body  = ({
            'token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c',
            'refreshToken': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c',
            'authLoginLinkId': authLoginLinkId,
        })
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





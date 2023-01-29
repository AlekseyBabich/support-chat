import Koa from "koa";
import Router from "koa-router";

import logger from "koa-logger";
import json from "koa-json";

const app = new Koa();
const router = new Router();

router.get("/", async(ctx, next) => {
    ctx.body = { msg: "Hello, it's Chat Support" };
    await next();
})

app.use(json());
app.use(logger());

app.use(router.routes()).use(router.allowedMethods());

app.listen(5100, () => {
    console.log("Koa started in http://localhost:5100 ");
});





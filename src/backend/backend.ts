import Koa from "koa";
import Router from "koa-router";
import logger from "koa-logger";
import json from "koa-json";

import Cors from "@cors";
import {GetToken} from "@src/backend/rest/GetToken";
import {GetAuthLoginLink} from "@src/backend/rest/GetAuthLoginLink";
import {SignUp} from "@src/backend/rest/SignUp";

const app = new Koa();
const router = new Router();

router
    .get("/token", GetToken())
    .get("/getAuthLoginLink", GetAuthLoginLink())
    .post("/signUp", SignUp())

app.use(Cors());
app.use(json());
app.use(logger());

app.use(router.routes()).use(router.allowedMethods());

app.listen(5100, () => {
    console.log("Koa started in http://localhost:5100 ");
});





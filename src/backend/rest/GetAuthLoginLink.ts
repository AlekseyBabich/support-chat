import {ExtendableContext} from "koa";
import {v4 as uuid} from "@lukeed/uuid/secure";
import {Pool} from "pg";
import backend from "@config/backend";
import {makeDB} from "@db";
import { makeAuthLoginLinks, makeUsers } from "@db/repo";
import { addSeconds } from 'date-fns';

const dbPool = new Pool(backend.db)
const db = makeDB(dbPool)
const authLoginLinks = makeAuthLoginLinks(db)
const users = makeUsers(db)

interface AuthLoginLink{
    userId: string;
}
export function GetAuthLoginLink(){
    return async (ctx: ExtendableContext) => {
        const body = <AuthLoginLink>ctx.request.body;

        if(!body.userId){
            ctx.body = ({
                body: 'no userId',
                status_code: ctx.status
            });
            return 'error';
        }
        const authLoginLinkId = uuid()

        await db.withTransaction( async (con) => {
            const user = await users.selectById(con, body.userId)
            if(!user){
                ctx.body = {
                    body: 'no this user',
                    status_code: ctx.status
                }
                return 'error'
            }

            const authLoginLink = await authLoginLinks.insert(con, {
                id: authLoginLinkId,
                userId: body.userId,
                createdAt: new Date(),
                expireAt: addSeconds(new Date(), 45)
            })

            ctx.body = { body: `${backend.frontendURL}/loginLink?authLoginLinkId=${authLoginLink.id}` }
            return 'ok'
        })
        return;
    }
}

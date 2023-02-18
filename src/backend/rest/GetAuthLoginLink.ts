import {ExtendableContext} from "koa";
import {v4 as uuid} from "@lukeed/uuid/secure";
import {Pool} from "pg";
import backend from "@config/backend";
import {makeDB} from "@db";
import {makeAuthLoginLinks, makeUsers} from "@db/repo";

const dbPool = new Pool(backend.db)
const db = makeDB(dbPool)
const authLoginLinks = makeAuthLoginLinks(db)
const users = makeUsers(db)

export function GetAuthLoginLink(){
    return async (ctx: ExtendableContext) => {
        const userId: string = ctx.request.query.userId as string;

        if(!userId){
            ctx.body = ({ 'body': 'no userId' });
            return;
        }
        const authLoginLinkId = uuid()

        await db.withTransaction( async (con) => {
            const user = await users.selectById(con, userId)
            if(!user){
                ctx.body = 'no this user'
                return
            }

            const authLoginLink = await authLoginLinks.insert(con, {
                id: authLoginLinkId,
                userId,
                createdAt: new Date(),
                expireAt: new Date()
            })

            ctx.body = `${backend.frontendURL}/loginLink?authLoginLinkId=${authLoginLink.id}`
            return 'ok'
        })
        return;
    }
}

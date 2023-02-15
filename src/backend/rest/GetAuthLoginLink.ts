import {ExtendableContext} from "koa";
import {v4 as uuid} from "@lukeed/uuid/secure";
import {Pool} from "pg";
import backend from "@config/backend";
import {makeDB} from "@db";
import {makeAuthLoginLinks} from "@db/repo";

const dbPool = new Pool(backend.db)
const db = makeDB(dbPool)
const authLoginLinks = makeAuthLoginLinks(db)

export function GetAuthLoginLink(){
    return async (ctx: ExtendableContext) => {
        const userId: number = Number(ctx.request.query.userId) as number;

        if(userId){
            const authLoginLinkId = uuid()
            await db.withTransaction( async (con) => {
                ctx.body = await authLoginLinks.insert(con, {
                    id: authLoginLinkId,
                    userId,
                    createdAt: new Date(),
                    expireAt: new Date()
                })
                return 'ok'
            })
            return;
        }
        ctx.body = ({ 'body': 'no userId' });
        return;
    }
}

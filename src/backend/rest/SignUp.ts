import {ExtendableContext} from "koa";
import {Pool} from "pg";
import backend from "@config/backend";
import {makeDB} from "@db";
import {makeUsers} from "@db/repo";

const dbPool = new Pool(backend.db)
const db = makeDB(dbPool)
const users = makeUsers(db)

export function SignUp(){
    return async (ctx: ExtendableContext) => {
        if(ctx.request){
            await db.withTransaction( async (con) => {
                ctx.body = await users.insert(con, {
                    createdAt: new Date()
                })
                return 'ok'
            })
            return;
        }
        return;
    }
}

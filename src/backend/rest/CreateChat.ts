import {ExtendableContext} from "koa";
import {Pool} from "pg";
import backend from "@config/backend";
import {makeDB} from "@db";
import { makeChats, makeUsers } from "@db/repo";
import {v4 as uuid} from "@lukeed/uuid/secure";

const dbPool = new Pool(backend.db)
const db = makeDB(dbPool)
const chats = makeChats(db)
const users = makeUsers(db)

interface CreateChat{
  userId: string;
  chatName: string;
}

export function CreateChat(){
  return async (ctx: ExtendableContext) => {
    const body = <CreateChat>ctx.request.body;

    if(!body.chatName){
      ctx.body = ({
        body: 'no chatName',
        status_code: ctx.status
      });
      return 'error';
    }

    if(!body.userId){
      ctx.body = ({
        body: 'no userId',
        status_code: ctx.status
      });
      return 'error';
    }

    await db.withTransaction( async (con) => {
      const user = await users.selectById(con, body.userId)
      if(!user){
        ctx.body = ({
          body: 'no user with this id',
          status_code: ctx.status
        });
        return 'error';
      }

      ctx.body = await chats.insert(con, {
        id: uuid(),
        userId: body.userId,
        name: body.chatName,
        createdAt: new Date()
      })
      return 'ok'
    })
    return;
  }
}

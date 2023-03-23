import { DefaultState, ExtendableContext } from "koa";
import {Pool} from "pg";
import backend from "@config/backend";
import {makeDB} from "@db";
import { makeChats, makeChatUsers, makeUsers } from "@db/repo";
import {v4 as uuid} from "@lukeed/uuid/secure";

const dbPool = new Pool(backend.db)
const db = makeDB(dbPool)
const chats = makeChats(db)
const chatUsers = makeChatUsers(db)
const users = makeUsers(db)

interface CreateChat{
  userName: string
  chatName: string;
}

export function CreateChat(){
  return async (ctx: ExtendableContext & {state: DefaultState}) => {
    const body = <CreateChat>ctx.request.body;
    const createUserId = ctx.state.user.user_metadata.chat_user_id

    if(!body.chatName){
      ctx.body = ({
        body: 'no chatName',
        status_code: ctx.status
      });
      return 'error';
    }

    if(!body.userName){
      ctx.body = ({
        body: 'no userName',
        status_code: ctx.status
      });
      return 'error';
    }

    await db.withTransaction( async (con) => {
      const data = await users.selectByUserName(con, body.userName)

      if(!data){
        ctx.body = {
          body: 'no user with this userName',
          status_code: ctx.status
        }
        return 'error'
      }

      if (data.id ==  createUserId){
        ctx.body = {
          body: 'createUserId and UserName should not belong to the same user',
          status_code: ctx.status
        }
        return 'error'
      }

      const chat = await chats.insert(con, {
        id: uuid(),
        userId: createUserId,
        name: body.chatName,
        createdAt: new Date()
      })

      await chatUsers.insert(con, {
        id: uuid(),
        chatId: chat.id,
        userId: createUserId,
        createdAt: new Date()
      })

      await chatUsers.insert(con, {
        id: uuid(),
        chatId: chat.id,
        userId: data.id,
        createdAt: new Date()
      })

      ctx.body = chat
      return 'ok'
    })
    return;
  }
}

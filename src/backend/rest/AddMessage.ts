import {ExtendableContext} from "koa";
import {Pool} from "pg";
import backend from "@config/backend";
import {makeDB} from "@db";
import { makeChatMessages, makeChats, makeChatUsers } from "@db/repo";
import {v4 as uuid} from "@lukeed/uuid/secure";


const dbPool = new Pool(backend.db)
const db = makeDB(dbPool)
const chatMessages = makeChatMessages(db)
const chats = makeChats(db)
const chatUsers = makeChatUsers(db)

interface AddMessage{
  chatId: string;
  userId: string
  content: string;
}

export function AddMessage(){
  return async (ctx: ExtendableContext) => {
    const body = <AddMessage>ctx.request.body;

    if(!body.chatId){
      ctx.body = ({
        body: 'no chatId',
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

    if(!body.content){
      ctx.body = ({
        body: 'no content',
        status_code: ctx.status
      });
      return 'error';
    }

    await db.withTransaction( async (con) => {
      const chat = await chats.selectById(con, body.chatId)
      if(!chat){
        ctx.body = ({
          body: 'no chat with this id',
          status_code: ctx.status
        });
        return 'error';
      }

      const data = await chatUsers.selectByChatIdUserId(con, body.chatId, body.userId)
      if(!data){
        ctx.body = ({
          body: 'no user with this id in this chat',
          status_code: ctx.status
        });
        return 'error';
      }

      ctx.body = await chatMessages.insert(con, {
        id: uuid(),
        chatId: body.chatId,
        userId: body.userId,
        content: body.content,
        createdAt: new Date()
      })
      return 'ok'
    })
    return;
  }
}

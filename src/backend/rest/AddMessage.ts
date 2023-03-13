import {ExtendableContext} from "koa";
import {Pool} from "pg";
import backend from "@config/backend";
import {makeDB} from "@db";
import { makeChatMessages, makeChats } from "@db/repo";
import {v4 as uuid} from "@lukeed/uuid/secure";
import { createClient } from "@supabase/supabase-js";

const dbPool = new Pool(backend.db)
const db = makeDB(dbPool)
const chatMessages = makeChatMessages(db)
const chats = makeChats(db)
const supabase = createClient(backend.db.supabaseUrl, backend.db.serviseRoleKey)

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

      const { data, error } = await supabase
        .from('ChatUsers')
        .select()
        .eq('chatId', body.chatId)
        .eq('userId', body.userId)
        .single()

      if(error){
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

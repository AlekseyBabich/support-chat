import {ExtendableContext} from "koa";
import {Pool} from "pg";
import backend from "@config/backend";
import {makeDB} from "@db";
import { makeChats, makeChatUsers, makeUsers } from "@db/repo";
import {v4 as uuid} from "@lukeed/uuid/secure";
import { createClient } from "@supabase/supabase-js";

const dbPool = new Pool(backend.db)
const db = makeDB(dbPool)
const chats = makeChats(db)
const chatUsers = makeChatUsers(db)
const users = makeUsers(db)
const supabase = createClient(backend.db.supabaseUrl, backend.db.serviseRoleKey)

interface CreateChat{
  createUserId: string;
  userName: string
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

    if(!body.createUserId){
      ctx.body = ({
        body: 'no createUserId',
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
      const { data, error } = await supabase
        .from('Users')
        .select()
        .eq('name', body.userName)
        .single()

      if(error){
        ctx.body = {
          body: 'no user with this userName',
          status_code: ctx.status
        }
        return 'error'
      }

      console.log(data.id)
      console.log(body.createUserId)
      if (data.id ==  body.createUserId){
        ctx.body = {
          body: 'createUserId and UserName should not belong to the same user',
          status_code: ctx.status
        }
        return 'error'
      }

      const createUser = await users.selectById(con, body.createUserId)

      if(!createUser){
        ctx.body = ({
          body: 'no create user with this id',
          status_code: ctx.status
        });
        return 'error';
      }

      const chat = await chats.insert(con, {
        id: uuid(),
        userId: body.createUserId,
        name: body.chatName,
        createdAt: new Date()
      })

      await chatUsers.insert(con, {
        id: uuid(),
        chatId: chat.id,
        userId: body.createUserId,
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

import React, { useEffect, useState } from 'react'
import { Divider, Grid, Paper } from '@mui/material'
import { Box } from '@mui/system'
import { useAppDispatch, useAppSelector } from "@src/frontend/store/Hooks/hook";
import Button from "@mui/material/Button";
import CreateChatModal from "@component/Chat/CreateChatModal";
import { chatService } from "@src/frontend/services/chat.service";
import { setCurrentChatId, setListChats, setMessages } from "@src/frontend/store/Slice/chatSlice";
import { createClient } from "@supabase/supabase-js";
import frontend from "@config/frontend";

const ChatList = () => {
  const dispatch = useAppDispatch()
  let { listChats } = useAppSelector(state => state.chat)
  const supabase = createClient(frontend.supabase.supabaseUrl, frontend.supabase.apiKey)

  const [ openCreateChat, setOpenCreateChat ] = useState(false);
  const handleOpenCreateChat = () => setOpenCreateChat(true);
  const handleCloseCreateChat = () => setOpenCreateChat(false);

  const currentChat = async (id: string) => {
    let { data }: any = await supabase
      .from('ChatMessages')
      .select('*')
      .eq('chatId', id)
    dispatch(setCurrentChatId(id))
    dispatch(setMessages(data))
  }

  const reverseListChats = [...listChats].reverse()

  useEffect(() => {
    chatService.getListChats().then(res => {
      dispatch(setListChats(res.data))
      return
    })
  }, [])

  return (
    <Grid item md={ 3 }>
      <Paper elevation={ 3 }
             sx={ { height: '720px', justifyContent: 'center', overflow: 'auto' } }
      >
          <Button variant='contained'
                  sx={ { ml: '50px', mt: '15px' } }
                  onClick={ handleOpenCreateChat }
          >
            Создать чат
          </Button>
        <Divider variant={"middle"}
                 sx={{ mt: '15px' }}
        />

        { reverseListChats.map(chat =>

          <Box sx={ { mt: '15px' } }>
            <Paper
              key={ chat.chat.id }
              elevation={ 3 }
              sx={ { m: '10px', p: '10px', display: 'flex', justifyContent: 'center', cursor: 'pointer' } }
              onClick={() => currentChat(chat.chat.id)}
            >
              { chat.chat.name }
            </Paper>
          </Box>
        ) }

        <CreateChatModal open={ openCreateChat } handleClose={ handleCloseCreateChat }/>
      </Paper>
    </Grid>
  )
}

export default ChatList
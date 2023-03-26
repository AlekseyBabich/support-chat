import React, { useEffect, useState } from 'react'
import { Divider, Grid, Paper } from '@mui/material'
import { Box } from '@mui/system'
import { useAppDispatch, useAppSelector } from "@src/frontend/store/Hooks/hook";
import Button from "@mui/material/Button";
import CreateChatModal from "@component/Chat/CreateChatModal";
import { chatService } from "@src/frontend/services/chat.service";
import { setCurrentChatId, setListChats } from "@src/frontend/store/Slice/chatSlice";


const ChatList = () => {

  const dispatch = useAppDispatch()
  const { listChats } = useAppSelector(state => state.chat)
  const { isAuth, userName, userId } = useAppSelector(state => state.auth)

  const [ openCreateChat, setOpenCreateChat ] = useState(false);
  const handleOpenCreateChat = () => setOpenCreateChat(true);
  const handleCloseCreateChat = () => setOpenCreateChat(false);

  const currentChat = (id: string) => {
    dispatch(setCurrentChatId(id))
  }

  useEffect(() => {
    chatService.getListChats().then(res => {
      dispatch(setListChats(res.data))
      return
    })
  }, [])

  return (
    <Grid item md={ 3 }>
      <Paper elevation={ 3 }
             sx={ { height: '720px', justifyContent: 'center' } }
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

        { listChats.map(chat =>

          <Box sx={ { mt: '15px' } }>
            <Paper
              key={ chat.id }
              elevation={ 3 }
              sx={ { m: '10px', p: '10px', display: 'flex', justifyContent: 'center', cursor: 'pointer' } }
              onClick={() => currentChat(chat.id)}
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
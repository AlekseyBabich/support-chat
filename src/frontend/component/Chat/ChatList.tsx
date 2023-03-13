import React, { useState } from 'react'
import { Divider, Grid, Paper, Typography } from '@mui/material'
import { Box } from '@mui/system'
import { useAppSelector } from "@src/frontend/store/Hooks/hook";
import Button from "@mui/material/Button";
import CreateChatModal from "@component/Chat/CreateChatModal";


const ChatList = () => {

  const { isAuth, userName } = useAppSelector(state => state.auth)

  const [ openCreateChat, setOpenCreateChat ] = useState(false);
  const handleOpenCreateChat = () => setOpenCreateChat(true);
  const handleCloseCreateChat = () => setOpenCreateChat(false);


  return (
    <Grid item md={ 3 }>
      <Paper elevation={ 3 }
             sx={ { height: '720px' } }
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
        <Button variant='contained'
                sx={ { ml: '50px', mt: '15px' } }
        >
          Создать чат
        </Button>

        <CreateChatModal open={ openCreateChat } handleClose={ handleCloseCreateChat }/>
      </Paper>
    </Grid>
  )
}

export default ChatList
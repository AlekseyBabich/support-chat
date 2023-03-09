import * as React from 'react'
import { Grid } from '@mui/material'
import Messages from '@component/Dialogs/Messages'
import UserInfo from '@component/Dialogs/UserInfo'
import { Box } from "@mui/system";


const ChatPage = () => {
  return (
    <Box sx={ { flexGrow: 1 } }>
      <Grid container spacing={ 2 }
            justifyContent={ 'center' }
            sx={ { margin: '0 auto', width: '1000px' } }
      >
        <UserInfo/>
        <Messages/>
      </Grid>
    </Box>
  )
}

export default ChatPage;
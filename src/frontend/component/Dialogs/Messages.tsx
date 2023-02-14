import React, { useState } from 'react'
import { Grid, Paper } from '@mui/material'
import { Box } from '@mui/system'
import { useAppDispatch } from '../../store/Hooks/hook';
import { sendMessage } from "@src/frontend/store/Slice/appSlice";
import ListMessage from "@component/Dialogs/ListMessage";
import InputField from "@component/Dialogs/InputField";

export interface IMessage {
  id: number
  text: string
}


const Messages = () => {
  const dispatch = useAppDispatch()
  const [ text, setText ] = useState('')

  const addMessage = () => {
    if (text.trim().length)
      dispatch(sendMessage(text))
    setText('')
  }

  return (
    <Grid item md={ 9 }>
      <Paper elevation={ 3 }
             sx={ { height: '600px' } }
      >
        <Box sx={ { height: '600px', p: '8px' } }>
          <ListMessage/>
        </Box>
        <Box>
          <InputField text={ text } addMessage={ addMessage } setText={ setText }/>
        </Box>
      </Paper>
    </Grid>
  )
}

export default Messages
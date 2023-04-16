import React, { useEffect, useState } from 'react'
import { Grid, Paper } from '@mui/material'
import { Box } from '@mui/system'
import { useAppDispatch, useAppSelector } from '../../store/Hooks/hook';
import { sendMessage } from "@src/frontend/store/Slice/appSlice";
import ListMessage from "@component/Chat/ListMessage";
import InputField from "@component/Chat/InputField";
import { createClient } from '@supabase/supabase-js'
import frontend from '@config/frontend'

export interface IMessage {
  id: number
  text: string
}

const Messages = () => {
  const dispatch = useAppDispatch()
  const [ text, setText ] = useState('')
  const supabase = createClient(frontend.supabase.supabaseUrl, frontend.supabase.apiKey)

  useEffect(() => {
      supabase
        .from('ChatMessages')
        .on('INSERT', (payload) => console.log(payload)
        )
        .subscribe((err: any) => {
          console.log(err)
        })
  }, [])


  // supabase.auth.onAuthStateChange((event, session) => {
  //   if (event == 'TOKEN_REFRESHED') console.log('TOKEN_REFRESHED', session)
  // })

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
import React, { useEffect, useState } from 'react'
import { Grid, Paper } from '@mui/material'
import { Box } from '@mui/system'
import { useAppDispatch, useAppSelector } from '../../store/Hooks/hook';
import { sendMessage } from "@src/frontend/store/Slice/appSlice";
import ListMessage from "@component/Chat/ListMessage";
import InputField from "@component/Chat/InputField";
import { createClient } from '@supabase/supabase-js'

export interface IMessage {
  id: number
  text: string
}

const Messages = () => {
  const dispatch = useAppDispatch()
  const { token, refreshToken } = useAppSelector(state => state.auth)
  const [ text, setText ] = useState('')
  const supabaseUrl = 'http://localhost:8100'
  const apiKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.ewogICAgInJvbGUiOiAiYW5vbiIsCiAgICAiaXNzIjogInN1cGFiYXNlIiwKICAgICJpYXQiOiAxNjY1OTQzMjAwLAogICAgImV4cCI6IDE4MjM3MDk2MDAKfQ.XvP0jOBu9gNl5lIFd7OdQLgTxQLeN7K3OQR32ih6opg'
  const supabase = createClient(supabaseUrl, apiKey)

  useEffect(() => {
    supabase.auth.setSession( { access_token: token as string, refresh_token: refreshToken as string  }).then(() => {
        supabase
          .from('ChatMessages')
          .on('INSERT', (payload) => console.log(payload)
          )
          .subscribe((err: any) => {
            console.log(err)
          })
      }
    )
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
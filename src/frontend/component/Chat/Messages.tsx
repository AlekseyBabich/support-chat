import React, { useEffect, useState } from 'react'
import { Grid, Paper } from '@mui/material'
import { Box } from '@mui/system'
import { useAppDispatch, useAppSelector } from '../../store/Hooks/hook';
import ListMessage from "@component/Chat/ListMessage";
import InputField from "@component/Chat/InputField";
import { createClient, SupabaseRealtimePayload } from '@supabase/supabase-js'
import frontend from '@config/frontend'
import { chatService } from "@src/frontend/services/chat.service";
import { addNewMessage } from "@src/frontend/store/Slice/chatSlice";
import { ChatMessage } from "@entity";

const Messages = () => {
  const dispatch = useAppDispatch()
  const [ text, setText ] = useState('')
  const { currentChatId } = useAppSelector(state => state.chat)
  const supabase = createClient(frontend.supabase.supabaseUrl, frontend.supabase.apiKey)

  useEffect(() => {
      supabase
        .from('ChatMessages')
        .on('INSERT', (payload:SupabaseRealtimePayload<ChatMessage>) => {
            dispatch(addNewMessage(payload.new))
          }
        )
        .subscribe((err: any) => {
          console.log(err)
        })
  }, [])

  const addMessage = () => {
    if (text.trim().length)
      chatService.addMessage(currentChatId, text).then(() => {})
    setText('')
  }

  return (
    <Grid item md={ 9 }>
      <Paper elevation={ 3 }
             sx={ { height: '600px' } }
      >
        <Box sx={ { height: '600px', p: '8px', marginBottom: '20px' } }>
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
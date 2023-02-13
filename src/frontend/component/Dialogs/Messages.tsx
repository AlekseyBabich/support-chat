import React, { useState } from 'react'
import { Button, Grid, Paper, TextField } from '@mui/material'
import { Box } from '@mui/system'

export interface IMessage {
  id: number
  text: string
}


const Messages = () => {

  const [message, setMessage] = useState([])
  const [text, setText] = useState('')

  const sendMessage = () => {
    const newMessage: IMessage = {
      id: Date.now(),
      text
    }
    setMessage([...message, newMessage])
    setText('')
  }

  return (
    <Grid item md={ 9 }>
      <Paper elevation={ 3 }
             sx={ { height: '600px' } }
      >
        <Box sx={ { height: '600px', p: '8px'} }>
          <Box sx={{ p: '10px' }}>
            { message.map(el => <Paper elevation={ 3 } sx={{ p: '10px' }}>{el.text}</Paper>) }
          </Box>
        </Box>
        <Box>
          <TextField
            id='outlined-textarea'
            label='Введите сообщение'
            placeholder='Placeholder'
            multiline
            fullWidth
            value={text}
            onChange={e => setText(e.target.value)}
          />
        </Box>
        <Box>
          <Button variant='contained'
                  sx={{ mt: '10px' }}
                  onClick={sendMessage}
          >Отправить</Button>
        </Box>
      </Paper>
    </Grid>
  )
}

export default Messages
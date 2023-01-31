import React, { useState } from 'react'
import { Button, Grid, Paper, TextField } from '@mui/material'
import { Box } from '@mui/system'




const Messages = () => {

  const message: string = 'Тут будут сообщения'


  /*
    const [message, setMessage] = useState('')
  */

  return (
    <Grid item md={ 9 }>
      <Paper elevation={ 3 }
             sx={ { height: '600px' } }

      >
        <Box sx={ { height: '600px', p: '8px'} }>
          <Box>
            { message }
          </Box>
        </Box>
        <Box>
          <TextField
            id='outlined-textarea'
            label='Введите сообщение'
            placeholder='Placeholder'
            multiline
            fullWidth

            /*
                      onChange={e => e.target.value}
            */
          />
        </Box>
        <Box>
          <Button variant='contained'
                  sx={{ mt: '10px' }}
            /*
                            onClick={() => setMessage()}
            */
          >Отправить</Button>
        </Box>
      </Paper>
    </Grid>
  )
}

export default Messages
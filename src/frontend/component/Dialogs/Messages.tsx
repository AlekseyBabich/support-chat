import React, { useState } from 'react'
import { Button, Grid, TextField } from '@mui/material'
import { Box } from '@mui/system'




const Messages = () => {
  const message = 'Тут будут сообщения'

/*
  const [message, setMessage] = useState('')
*/

  return (
    <Grid item md={ 8 } sx={ { border: '1px solid red', mt: '20px' } }>
      <Box sx={ { margin: '0 auto', height: '600px' } }>
        <Box>
          { message }
        </Box>
      </Box>
      <Box sx={ { mr: '15px' } }>
        <TextField
          id='outlined-textarea'
          label='Введите сообщание'
          variant='outlined'
          placeholder='Placeholder'
          multiline
          fullWidth
/*
          onChange={e => e.target.value}
*/
        />
      </Box>
      <Box sx={ { mt: '5px', mb: '5px' } }>
        <Button variant='contained'
/*
                onClick={() => setMessage()}
*/
        >Отправить</Button>
      </Box>
    </Grid>
  )
}

export default Messages
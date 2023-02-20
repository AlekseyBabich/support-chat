import React from 'react';
import { Box } from "@mui/system";
import { Button, TextField } from "@mui/material";
import { KeyboardEvent } from 'react'

interface InputFieldProps {
  text: string
  addMessage: () => void
  setText: (str: string) => void
}



const InputField: React.FC<InputFieldProps> = ({ text, addMessage, setText }) => {

  const sendByKey = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      addMessage()
    }
  }

  return (
    <Box>
      <TextField
        id='outlined-textarea'
        label='Введите сообщение'
        multiline
        fullWidth
        value={ text }
        onChange={ e => setText(e.target.value) }
        onKeyDown={sendByKey}
      />
      <Box>
        <Button variant='contained'
                sx={ { mt: '10px' } }
                onClick={ addMessage }
        >Отправить</Button>
      </Box>
    </Box>
  );
};

export default InputField;


import React from 'react';
import { Box } from "@mui/system";
import { Button, TextField } from "@mui/material";

interface InputFieldProps {
  text: string
  addMessage: () => void
  setText: (str: string) => void
}


const InputField: React.FC<InputFieldProps> = ({ text, addMessage, setText }) => {
  return (
    <Box>
      <TextField
        id='outlined-textarea'
        label='Введите сообщение'
        placeholder='Placeholder'
        multiline
        fullWidth
        value={ text }
        onChange={ e => setText(e.target.value) }
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
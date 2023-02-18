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

/*
const MessageInput = ({ onSubmit }) => {
  const [messageText, setMessageText] = useState('')

  const submitOnEnter = (event) => {
    if (event.keyCode === 13) {
      onSubmit(messageText)
      setMessageText('')
    }
  }

  return (
    <>
      <input
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        type="text"
        placeholder="Send a message"
        value={messageText}
        onChange={(e) => setMessageText(e.target.value)}
        onKeyDown={(e) => submitOnEnter(e)}
      />
    </>
  )
}
*/

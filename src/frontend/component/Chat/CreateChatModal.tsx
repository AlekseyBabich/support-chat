import React, { useState } from 'react';
import { Box, Button, Modal, TextField } from "@mui/material";
import { useAppDispatch, useAppSelector } from "@src/frontend/store/Hooks/hook";
import { IModalProps } from "@src/frontend/types";
import { chatService } from "@src/frontend/services/chat.service";
import { setListChats } from "@src/frontend/store/Slice/chatSlice";


const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  backgroundColor: 'white',
  color: 'black ',
  border: '2px solid #000',
  borderRadius: '5px',
  boxShadow: 24,
  p: 4,
};


const CreateChatModal = ({ open, handleClose }: IModalProps) => {

  const dispatch = useAppDispatch()

  const [ chatName, setChatName ] = useState('')
  const [ userName, setUserName ] = useState('')

  const createUserId = useAppSelector(state => state.auth.userId)

  const sendCreateChat = () => {

    if (!chatName.trim().length) {
      alert('chatName обязательно!')
      return
    }
    if (!userName.trim().length) {
      alert('userName обязательно!')
      return
    }

    chatService.createChat(chatName, userName, createUserId).then((data) => {
      chatService.getListChats().then(res => {
        dispatch(setListChats(res.data))
        return
      })
      setChatName('')
      setUserName('')
      handleClose()
      return
    })
  };

  return (
    <div>
      <Modal
        open={ open }
        onClose={ handleClose }
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
      >
        <Box sx={ style }>
          <TextField
            autoFocus
            id='outlined-textarea'
            label='Введите Chat Name'
            multiline={ false }
            fullWidth
            value={ chatName }
            onChange={ e => setChatName(e.target.value) }
          />

          <TextField sx={ { mt: '20px' } }
                     id='outlined-textarea'
                     label='Введи userName друга'
                     multiline={ false }
                     fullWidth
                     value={ userName }
                     onChange={ e => setUserName(e.target.value) }
          />

          <Button variant='contained'
                  sx={ { mt: '20px' } }
                  onClick={ sendCreateChat }
          >
            Создать чат
          </Button>

        </Box>
      </Modal>
    </div>
  );
}
export default CreateChatModal;

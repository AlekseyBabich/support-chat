import React, { useEffect, useState } from 'react';
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Modal,
  Select,
  SelectChangeEvent,
  TextField
} from "@mui/material";
import { useAppDispatch, useAppSelector } from "@src/frontend/store/Hooks/hook";
import { IModalProps } from "@src/frontend/types";
import { chatService } from "@src/frontend/services/chat.service";
import { setAllUsers, setListChats } from "@src/frontend/store/Slice/chatSlice";


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
  const { allUsers } = useAppSelector(state => state.chat)

  const [ chatName, setChatName ] = useState('')
  const [ userName, setUserName ] = useState('')


  const handleChange = (event: SelectChangeEvent) => {
    setUserName(event.target.value as string);
  };

  const sendCreateChat = () => {

    if (!chatName.trim().length) {
      alert('chatName обязательно!')
      return
    }
    if (!userName.trim().length) {
      alert('userName обязательно!')
      return
    }

    chatService.createChat(chatName, userName).then((data) => {
      if (data.data.status_code == 404) {
        alert('createUserId and UserName should not belong to the same user')
        setChatName('')
        setUserName('')
        return;
      }

      chatService.getListChats().then(res => {
        dispatch(setListChats(res.data))
      })

      setChatName('')
      setUserName('')
      handleClose()
      return
    })
  };

  useEffect(() => {
    chatService.getAllUsers().then(res => {
      dispatch(setAllUsers(res.data))
      return res.data
    })
  }, [])

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

          <Box sx={ { minWidth: 120, mt: '20px'} }>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">userName</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={ userName }
                label="Введите userName друга"
                onChange={ handleChange }
              >
                { allUsers.map(user =>
                  <MenuItem value={user.name}>
                    { user.name }
                  </MenuItem>
                )}
              </Select>
            </FormControl>
          </Box>
          {/*
          <TextField sx={ { mt: '20px' } }
                     id='outlined-textarea'
                     label='Введи userName друга'
                     multiline={ false }
                     fullWidth
                     value={ userName }
                     onChange={ e => setUserName(e.target.value) }
          />
*/}

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

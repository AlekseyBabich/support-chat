import React, { useState } from 'react';
import { Box, Button, Modal, TextField } from "@mui/material";
import { authService } from "@src/frontend/services/auth.service";
import { useRouter } from "next/router";
import { setNewUserName } from "@src/frontend/store/Slice/authSlice";
import { useAppDispatch } from "@src/frontend/store/Hooks/hook";


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

export interface LoginModalProps {
  open: boolean
  handleClose: () => void
}

const LoginModal = ({ open, handleClose }: LoginModalProps) => {
  const [ userName, setUserName ] = useState('')

  const dispatch = useAppDispatch()
  const router = useRouter()

  const submitUserName = () => {
    handleClose()
    if (!userName.trim().length) {
      alert('Имя обязательно!')
      return
    }

    authService.loginUser(userName).then((link) => {
      if (link.data.status_code == 404) {
        alert('Пользователя с таким именем нет')
        return
      }

      dispatch(setNewUserName({ name: userName }))
      router.push(link.data.body)
    })

    setUserName('')
  }
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
            id='outlined-textarea'
            label='Введите userName'
            multiline
            fullWidth
            value={ userName }
            onChange={ e => setUserName(e.target.value) }
          />
          <Button variant='contained'
                  sx={ { mt: '10px' } }
                  onClick={ submitUserName }
          >Отправить</Button>
        </Box>
      </Modal>
    </div>
  );
};

export default LoginModal;
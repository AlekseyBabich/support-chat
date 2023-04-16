import React, { KeyboardEvent, useEffect, useState } from 'react';
import { Box, Button, Modal, TextField } from "@mui/material";
import { authService } from "@src/frontend/services/auth.service";
import { useRouter } from "next/router";
import { setNewUserId, setNewUserName } from "@src/frontend/store/Slice/authSlice";
import { useAppDispatch } from "@src/frontend/store/Hooks/hook";
import { IModalProps } from "@src/frontend/types";


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


const LoginModal = ({ open, handleClose }: IModalProps) => {
  const [ userName, setUserName ] = useState('')

  const dispatch = useAppDispatch()
  const router = useRouter()

  const submitUserName = () => {
    if (!userName.trim().length) {
      alert('Имя обязательно!')
      return;
    }

    //todo
    //- обработать ошибку 404

    authService.loginUser(userName).then((link) => {
      if (link.data.status_code == 404) {
        router.push('/login')
        alert('Пользователя с таким именем нет')
        return;
      }
      dispatch(setNewUserName({ name: userName }))
      dispatch(setNewUserId({ userId: link.data.userId }))
      router.push(link.data.body)
    })

    setUserName('')
  }

  const sendByKey = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      submitUserName()
    }
  }

  useEffect(() => {
    handleClose()
  },[router.push])

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
            label='Введите userName'
            multiline={false}
            fullWidth
            value={ userName }
            onChange={ e => setUserName(e.target.value) }
            onKeyDown={ sendByKey }
          />
          <Button variant='contained'
                  sx={ { mt: '10px' } }
                onClick={ submitUserName }
          >Войти</Button>
        </Box>
      </Modal>
    </div>
  );
};

export default LoginModal;
import React, { useState } from 'react';
import { Modal, TextField } from "@mui/material";
import { Box } from "@mui/system";
import Button from "@mui/material/Button";
import { LoginModalProps } from "@component/Header/LoginModal";
import { useAppDispatch } from "@src/frontend/store/Hooks/hook";
import { authService } from "@src/frontend/services/auth.service";
import { useRouter } from "next/router";
import { setNewUserName } from "@src/frontend/store/Slice/authSlice";


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

const SignupModal = ({ open, handleClose }: LoginModalProps) => {
  const [ userName, setUserName ] = useState('')

  const dispatch = useAppDispatch()
  const router = useRouter()

  const submitUserName = () => {
    handleClose()
    if (!userName.trim().length) {
      alert('Имя обязательно!')
      return
    }

    authService.createUser(userName).then((user) => {
      if (user.data.status_code == 404) {
        alert('Пользователей с таким именем уже есть!')
        return
      }

      authService.loginUser(user.data.name).then((link) => {
        dispatch(setNewUserName({ name: user.data.name }))
        router.push(link.data.body)
      })
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
          >Зарегистрироваться</Button>
        </Box>
      </Modal>
    </div>
  );
};

export default SignupModal;
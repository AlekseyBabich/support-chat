import React, { useEffect, useState } from 'react';
import { Modal, TextField } from "@mui/material";
import { Box } from "@mui/system";
import Button from "@mui/material/Button";
import { LoginModalProps } from "@component/Header/LoginModal";
import { useAppDispatch, useAppSelector } from "@src/frontend/store/Hooks/hook";
import { setNewUserName } from "@src/frontend/store/Slice/authSlice";
import { useMutation } from "react-query";
import { authService } from "@src/frontend/services/auth.service";
import { useRouter } from "next/router";


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

  const signUp = useMutation((name: string) =>
    authService.createUser(name)
  );

  const login = useMutation((name: string) =>
    authService.loginUser(name)
  );

  const submitUserName = () => {
    signUp.mutate(userName);
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
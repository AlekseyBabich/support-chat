import React, { useState } from 'react';
import { Modal, TextField } from "@mui/material";
import { Box } from "@mui/system";
import Button from "@mui/material/Button";
import { LoginModalProps } from "@component/Header/LoginModal";
import { useCreateUser } from "@src/frontend/store/Hooks/authHooks/useCreateUser";
import { useAppDispatch } from "@src/frontend/store/Hooks/hook";
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
  const createUserName = (e: any) => {
    const name = e.target.value
    debugger
    console.log(name)
    setUserName(name)
  }


  if (userName && userName.trim().length) {
    const {
      response,
      isLoading,

    } = useCreateUser(userName && userName)
    if (response && response.data.name) {
      dispatch(setNewUserName(response.data.name))
    }
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
/*
              onKeyDown={ sendByKey }
*/
            />
            <Button variant='contained'
                    sx={ { mt: '10px' } }
              onClick={ createUserName }
            >Зарегистрироваться</Button>


          </Box>
        </Modal>
    </div>
  );
};

export default SignupModal;
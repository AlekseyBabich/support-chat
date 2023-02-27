import React from 'react';
import { Box, Button, Modal, TextField } from "@mui/material";



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
              /*
                            value={ text }
                            onChange={ e => setText(e.target.value) }
                            onKeyDown={ sendByKey }
              */
            />
            <Button variant='contained'
                    sx={ { mt: '10px' } }
              /*onClick={ addMessage }*/
            >Отправить</Button>

            {/*
            <Typography id='modal-modal-title' variant='h6' component='h2'>
              Text in a modal
            </Typography>
            <Typography id='modal-modal-description' sx={ { mt: 2 } }>
              <Link href={''}>Тут будет ссылка на телеграмм</Link>
            </Typography>
*/ }

          </Box>
        </Modal>
    </div>
  );
};

export default LoginModal;
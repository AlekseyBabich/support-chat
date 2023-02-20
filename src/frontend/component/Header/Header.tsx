import * as React from 'react'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import MenuIcon from '@mui/icons-material/Menu'
import { Badge, Modal } from '@mui/material'
import MailIcon from '@mui/icons-material/Mail'
import { Box } from '@mui/system';
import Link from 'next/link';
import { useState } from "react";




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

interface HandleMenuProps  {
  handleMenu: () => void,
}

const Header = ( { handleMenu }: HandleMenuProps ) => {
  const [ open, setOpen ] = useState( false );
  const handleOpen = () => setOpen( true );
  const handleClose = () => setOpen( false );


  return (
    <AppBar position='static'>
      <Toolbar>
        <IconButton
          size='large'
          edge='start'
          color='inherit'
          aria-label='menu'
          sx={ { mr: 2 } }
          onClick={ handleMenu }
        >
          <MenuIcon/>
        </IconButton>
        <Typography variant='h6' component='div' sx={ { flexGrow: 1 } }>
          Support chat
        </Typography>
        <IconButton size='large' aria-label='show 4 new mails' color='inherit'>
          <Badge badgeContent={ 2 } color='error'>
            <MailIcon/>
          </Badge>
        </IconButton>
        <Button color='inherit'>Sing In</Button>
        <Button color='inherit' onClick={ handleOpen }>Log In</Button>
        <Modal
          open={ open }
          onClose={ handleClose }
          aria-labelledby='modal-modal-title'
          aria-describedby='modal-modal-description'
        >
          <Box sx={ style }>
            <Typography id='modal-modal-title' variant='h6' component='h2'>
              Text in a modal
            </Typography>
            <Typography id='modal-modal-description' sx={ { mt: 2 } }>
              <Link href={''}>Тут будет ссылка на телеграмм</Link>
            </Typography>
          </Box>
        </Modal>
      </Toolbar>
    </AppBar>
  )
}

export default Header

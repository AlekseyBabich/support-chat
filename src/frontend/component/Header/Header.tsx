import * as React from 'react'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import MenuIcon from '@mui/icons-material/Menu'
import { Badge } from '@mui/material'
import MailIcon from '@mui/icons-material/Mail'




const Header = ( { handleMenu }: any ) => {
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
        <Button color='inherit'>Login</Button>
      </Toolbar>
    </AppBar>
  )
}

export default Header

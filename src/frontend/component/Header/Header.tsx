import * as React from 'react'
import { useEffect, useState } from 'react'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import MenuIcon from '@mui/icons-material/Menu'
import { Badge, Link } from '@mui/material'
import MailIcon from '@mui/icons-material/Mail'
import { Box } from '@mui/system';
import { useAppDispatch, useAppSelector } from "@src/frontend/store/Hooks/hook";
import { logout } from '../../store/Slice/authSlice'
import { useRouter } from "next/router";
import LoginModal from "@component/Header/LoginModal";
import SignupModal from "@component/Header/SignupModal";


interface HandleMenuProps {
  handleMenu: () => void,
}


const Header = ({ handleMenu }: HandleMenuProps) => {
  const [ openLogin, setOpenLogin ] = useState(false);
  const [ openSignup, setOpenSignup ] = useState(false);
  const handleOpenLogin = () => setOpenLogin(true);
  const handleOpenSignUp = () => setOpenSignup(true);
  const handleCloseLogin = () => setOpenLogin(false);
  const handleCloseSignup = () => setOpenSignup(false);
  const dispatch = useAppDispatch()
  const { isAuth } = useAppSelector(state => state.auth)
  const router = useRouter()


  useEffect(() => {
    if (!isAuth) window.localStorage.clear()
  }, [ isAuth ])


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
        <Box
          sx={ {
            margin: '10px',
            cursor: 'pointer'
          } }
        >
          <Link color="inherit" onClick={ () => router.push('/') }>
            { 'HOME' }
          </Link>
        </Box>
        <Box
          sx={ {
            margin: '10px',
            cursor: 'pointer'
          } }
        >
          <Link color='inherit' onClick={ () => router.push('/supportChat') }>
            { 'supportChat' }
          </Link>
        </Box>
        <Typography variant='h3' component='div' sx={ { flexGrow: 1, textAlign: 'center' } }>
          Support chat
        </Typography>
        <IconButton size='large' aria-label='show 4 new mails' color='inherit'>
          <Badge badgeContent={ 2 } color='error'>
            <MailIcon/>
          </Badge>
        </IconButton>
        { !isAuth
          ?
          <div>
            <Button color='inherit' onClick={ handleOpenSignUp }>Зарегистрироваться</Button>
            <Button color='inherit' onClick={ handleOpenLogin }>Войти</Button>
          </div>
          :
          <Button color='inherit' onClick={ () => dispatch(logout()) }>Выйти</Button>
        }

        <SignupModal open={ openSignup } handleClose={ handleCloseSignup }/>
        <LoginModal open={ openLogin } handleClose={ handleCloseLogin }/>

      </Toolbar>
    </AppBar>
  )
}

export default Header

import React, { useState } from 'react'
import Header from '@component/Header/Header'
import Menu from '@component/Menu/Menu'
import DialogsList from '@component/Dialogs/DialogsList'
import { Container } from '@mui/system'




export default function Home() {

  const [ isMenuOpen, setMenuOpen ] = useState( false )


  return (
    <>
      <Header handleMenu={ () => setMenuOpen( true ) }/>
      <Container sx={ {
        marginTop: '30px',
      } }>
        <DialogsList/>
        <Menu menuOpen={ isMenuOpen }
              menuClose={ () => setMenuOpen( false ) }
        />
      </Container>
    </>
  )
}

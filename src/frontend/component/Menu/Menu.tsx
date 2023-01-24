import React from 'react'
import { Divider, Drawer, List, ListItem, ListItemIcon, ListItemText } from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'




const Menu = ( props: any ) => {

  const {
    menuOpen,
    menuClose,
  } = props

  return (
    <Drawer anchor={ 'left' }
            open={ menuOpen }
            onClose={ menuClose }
    >
      <List sx={ { width: '400px' } }>
        <ListItem>
          <ListItemIcon>
            <MenuIcon/>
          </ListItemIcon>
          <ListItemText primary={ 'Menu' }/>
        </ListItem>
        <Divider/>
      </List>
    </Drawer>
  )
}

export default Menu
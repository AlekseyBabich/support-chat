import * as React from 'react'
import { Grid } from '@mui/material'
import Messages from '@component/Dialogs/Messages'
import Dialogs from '@component/Dialogs/Dialogs'




const DialogsList = () => {
  return (
    <Grid container spacing={ 2 }
          sx={ { bgcolor: '#b9f7fa', height: '100%', borderRadius: '10px' } }>
      <Dialogs/>
      <Messages/>
    </Grid>
  )
}

export default DialogsList;
import * as React from 'react'
import { Grid } from '@mui/material'
import Messages from '@component/Dialogs/Messages'
import Dialogs from '@component/Dialogs/Dialogs'
import { Box } from "@mui/system";




const DialogsList = () => {
  return (
    <Box sx={ { flexGrow: 1 } }>
      <Grid container spacing={ 2 }
            justifyContent={ 'center' }
            sx={ { margin: '0 auto', width: '1000px' } }
      >
        <Dialogs/>
        <Messages/>
      </Grid>
    </Box>
  )
}

export default DialogsList;
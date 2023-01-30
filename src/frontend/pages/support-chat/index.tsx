import * as React from 'react'
import { Grid, Paper } from "@mui/material";
import DialogsList from "@component/Dialogs/DialogsList";




const Chat = () => {
  return (
    <>
      <DialogsList/>
    </>
  )
}

export default Chat



/*
<Grid container spacing={ 2 }
            sx={ { margin: '0 auto', textAlign: 'center', width: '1200px', height: '100%' } }
      >

        <Grid item xs={ 3 }>
          <Paper elevation={ 3 } sx={ { height: '600px' } }>
            <h1>Support Chat</h1>
          </Paper>
        </Grid>

        <Grid item xs={ 9 }>
          <Paper elevation={ 3 } sx={ { height: '600px' } }>
            <h2>Dialog</h2>
          </Paper>

        </Grid>
      </Grid>*/

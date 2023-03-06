import React from 'react'
import { Grid, Paper, Typography } from '@mui/material'
import { Box } from '@mui/system'
import { useAppSelector } from "@src/frontend/store/Hooks/hook";




const UserInfo = () => {

  const { isAuth} = useAppSelector(state => state.auth)
  return (
    <Grid item md={ 3 }>
      <Paper elevation={ 3 }
             sx={ { height: '720px' } }
      >
        <Typography variant={ 'h5' }
                    sx={ { textAlign: 'center', padding: '8px' } }
        >
          User info:
        </Typography>
        <Box sx={ { fontSize: '20px' } }>
          <ul>
            <li>
              user name:
            </li>
            <li>
              user id:
            </li>
            <li>
              status: {
              isAuth && 'online'
            }

            </li>
          </ul>
        </Box>
      </Paper>
    </Grid>
  )
}

export default UserInfo
import React, { useEffect } from 'react'
import { useAppSelector } from "@src/frontend/store/Hooks/hook";
import { useRouter } from "next/router";
import { Box, Grid, Paper, Stack, Typography } from "@mui/material";


export default function Home() {
  const { isAuth, token, refreshToken, userName, userId } = useAppSelector(state => state.auth)
  const router = useRouter()


  useEffect(() => {
    if (!isAuth) {
      router.push('/login')
    }
  }, [ isAuth ])


  return (
    <>
      <Box sx={ {
        margin: '0 auto',
        maxWidth: '800px'
      } }>
        <Box>
          <Paper sx={ {
            mt: '10px',
            bgcolor: 'aqua',
            textAlign: 'center'
          } }>
            <Typography sx={ { m: '10px' } }
                        variant={ 'h1' }
                        component={ 'div' }
            >
              Домашняя страница
            </Typography>
            <Typography sx={ { m: '10px' } }
                        variant={ 'h6' }
                        component={ 'div' }
            >
              isAuth: { String(isAuth) }
            </Typography>
          </Paper>
        </Box>

        <Box>
          <Paper sx={ {
            wordWrap: 'break-word',
            bgcolor: 'aqua'
          } }>
            <Typography sx={ { m: '10px' } }
                        variant={ 'h2' }
                        component={ 'div' }
            >
              userName: { userName }
            </Typography>
            <Typography sx={ { m: '10px' } }
                        variant={ 'h6' }
                        component={ 'div' }
            >
              Token: { token ?? 'Сгорели?' }
            </Typography>
            <Typography sx={ { m: '10px', mt: '30px' } }
                        variant={ 'h6' }
                        component={ 'div' }
            >
              refreshToken: { refreshToken ?? 'Сгорели?' }
            </Typography>
            <Typography sx={ { m: '10px', mt: '30px' } }
                        variant={ 'h6' }
                        component={ 'div' }
            >
              userId: { userId ?? 'Сгорели?' }
            </Typography>
          </Paper>
        </Box>
      </Box>
    </>
  )
}

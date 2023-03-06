import React from 'react';
import { Typography } from "@mui/material";
import { useAppSelector } from "@src/frontend/store/Hooks/hook";
import { useRouter } from "next/router";

const  login = () => {
  const router = useRouter();
  const { isAuth } = useAppSelector(state => state.auth)

  if (isAuth) {
    router.push('/')
  }
  return (
    <div>
      {!isAuth &&
          <Typography variant={'h1'}
                      sx={{justifyContent: 'center', textAlign: 'center'}}
          >
              Вы не зарегестрированы.
          </Typography>
      }
    </div>
  );
};

export default login;
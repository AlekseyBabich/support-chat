import React, { useEffect } from 'react'
import { useAppSelector } from "@src/frontend/store/Hooks/hook";
import { useRouter } from "next/router";
import { Link } from "@mui/material";
import { signUpApi, useCreateUserMutation } from "@src/frontend/pages/api/queryApi/signUpApi";


export default function Home() {
  const { isAuth, token, refreshToken, userName } = useAppSelector(state => state.auth)
  const router = useRouter()

  const {} = useCreateUserMutation()

  useEffect(() => {
    if (!isAuth) {
      router.push('/login')
    }
  }, [isAuth])


  return (
    <>
      <h1>Домашняя страница</h1>
      <h3>isAuth: { String(isAuth) }</h3>
      <h3>Token: { token ?? 'Сгорели?' }</h3>
      <h3>refreshToken: { refreshToken ?? 'Сгорели?' }</h3>
      <h3>userName: { String(userName) }</h3>

    </>
  )
}

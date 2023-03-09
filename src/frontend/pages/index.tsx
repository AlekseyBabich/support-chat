import React, { useEffect } from 'react'
import { useAppSelector } from "@src/frontend/store/Hooks/hook";
import { useRouter } from "next/router";


export default function Home() {
  const { isAuth, token, refreshToken, userName } = useAppSelector(state => state.auth)
  const router = useRouter()


  useEffect(() => {
    if (!isAuth) {
      router.push('/login')
    }
  }, [ isAuth ])


  return (
    <>
      <h1>Домашняя страница</h1>
      <h3>isAuth: { String(isAuth) }</h3>
      <h3>Token: { token ?? 'Сгорели?' }</h3>
      <h3>refreshToken: { refreshToken ?? 'Сгорели?' }</h3>
      <h3>userName: { userName }</h3>

    </>
  )
}

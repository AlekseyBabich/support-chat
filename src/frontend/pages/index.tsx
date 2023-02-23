import React, { useEffect } from 'react'
import { useAppSelector } from "@src/frontend/store/Hooks/hook";
import { useRouter } from "next/router";


export default function Home() {
/*
  const { isAuth } = useAppSelector(state => state.auth)
  const router = useRouter()

  useEffect(() => {
    if (!isAuth) {
      router.push('/loginLink')
    }
  }, [])
*/

  return (
    <>
      <div>Домашняя страница</div>
    </>
  )
}

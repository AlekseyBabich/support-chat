import * as React from 'react'
import ChatPage from "@component/Dialogs/ChatPage";
import { useAppSelector } from "@src/frontend/store/Hooks/hook";
import { useEffect } from "react";
import { useRouter } from "next/router";


const Chat = () => {

  const { isAuth } = useAppSelector(state => state.auth)
  const router = useRouter()

  useEffect(() => {
    if (!isAuth) {
      router.push('/login')
    }
  }, [ isAuth ])

  return (
    <>
      <ChatPage/>
    </>
  )
}

export default Chat




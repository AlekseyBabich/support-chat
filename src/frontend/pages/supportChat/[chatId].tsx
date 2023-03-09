import { useRouter } from 'next/router'


const chatId = () => {
  const router = useRouter()
  const { chatId } = router.query

  return <h1>chat_Id: { chatId }</h1>
}

export default chatId
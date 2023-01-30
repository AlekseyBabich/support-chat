import { useRouter } from 'next/router'




const chatId = () => {
  const router = useRouter()
  const { chatId } = router.query

  return <p>chat_Id: { chatId }</p>
}

export default chatId
import { useRouter } from 'next/router'

const SupportChat = () => {
  const router = useRouter()
  const { chatId } = router.query

  return <p>chatId: {chatId}</p>
}

export default SupportChat;
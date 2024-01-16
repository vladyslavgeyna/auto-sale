import RequireAuth from '@/hoc/RequireAuth'
import ChatPage from '../../components/chat-page/ChatPage'

const Chat = () => {
	return (
		<RequireAuth>
			<ChatPage />
		</RequireAuth>
	)
}

export default Chat

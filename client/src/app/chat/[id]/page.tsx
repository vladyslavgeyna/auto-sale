import ConversationPage from '@/components/conversation-page/ConversationPage'
import RequireAuth from '@/hoc/RequireAuth'

type PropsType = {
	params: {
		id: string
	}
}

const Conversation = ({ params }: PropsType) => {
	const conversationId = params.id

	return (
		<RequireAuth>
			<ConversationPage conversationId={conversationId} />
		</RequireAuth>
	)
}

export default Conversation

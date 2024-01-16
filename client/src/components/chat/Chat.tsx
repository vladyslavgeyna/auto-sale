import IGetUserConversationsOutput from '@/types/conversation/get-user-conversations-output.interface'
import ConversationItem from '../conversation-item/ConversationItem'

const Chat = ({
	conversations,
}: {
	conversations: IGetUserConversationsOutput[]
}) => {
	return (
		<div className='flex gap-5 mt-5'>
			<div className='w-[30%] flex flex-col gap-2'>
				{conversations.map(c => (
					<ConversationItem key={c.id} conversation={c} />
				))}
			</div>
			<p className='text-7xl font-bold text-gray-300 w-auto'>
				Choose a conversation to start messaging
			</p>
		</div>
	)
}

export default Chat

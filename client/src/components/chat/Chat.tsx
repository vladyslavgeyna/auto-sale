import IGetConversationByIdOutput from '@/types/conversation/get-conversation-by-id-output.interface'
import ConversationItem from '../conversation-item/ConversationItem'

const Chat = ({
	conversations,
}: {
	conversations: IGetConversationByIdOutput[]
}) => {
	return (
		<div className='flex flex-col-reverse md:flex-row gap-5 mt-5'>
			<div className='w-full md:w-[500px] flex flex-col gap-2'>
				{conversations.map(c => (
					<ConversationItem key={c.id} conversation={c} />
				))}
			</div>
			<p className='text-5xl lg:text-7xl font-bold text-center md:text-left text-gray-300 w-full'>
				Choose a conversation to start messaging
			</p>
		</div>
	)
}

export default Chat

import { useCreateConversation } from '@/hooks/useCreateConversation'
import { Loader2 } from 'lucide-react'
import { HiChatBubbleLeftEllipsis } from 'react-icons/hi2'
import { Button } from '../ui/Button'

type PropsType = {
	currentUserId: string
	sellerId: string
}

const WriteToSeller = ({ currentUserId, sellerId }: PropsType) => {
	const { mutate: createConversation, isPending } =
		useCreateConversation(currentUserId)

	const handleWriteToSeller = () => {
		createConversation({
			senderId: currentUserId,
			receiverId: sellerId,
		})
	}

	return (
		<>
			<Button
				onClick={handleWriteToSeller}
				className='w-full flex gap-2 items-center justify-center mt-3'>
				{isPending ? (
					<Loader2 className='h-6 w-6 animate-spin' />
				) : (
					<>
						<HiChatBubbleLeftEllipsis />{' '}
						<span>Write to the seller</span>
					</>
				)}
			</Button>
			<hr className='mt-3' />
		</>
	)
}

export default WriteToSeller

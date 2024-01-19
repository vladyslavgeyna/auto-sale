import { Loader2 } from 'lucide-react'
import { Button } from '../ui/Button'

type PropsType = {
	onClick: React.MouseEventHandler<HTMLButtonElement>
	isLoading: boolean
}

const LoadMoreMessagesButton = ({ onClick, isLoading }: PropsType) => {
	return (
		<Button className='w-full' variant={'secondary'} onClick={onClick}>
			{isLoading ? (
				<Loader2 className='h-6 w-6 animate-spin' />
			) : (
				'Load more messages'
			)}
		</Button>
	)
}

export default LoadMoreMessagesButton

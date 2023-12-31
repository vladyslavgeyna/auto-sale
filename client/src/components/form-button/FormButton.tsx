import { Loader2 } from 'lucide-react'
import { Button } from '../ui/button'

type PropsType = {
	className?: string
	isLoading?: boolean
	isDisabled?: boolean
	children: React.ReactNode
}

const FormButton = ({
	isDisabled = false,
	isLoading = false,
	className = '',
	children,
}: PropsType) => {
	return (
		<Button disabled={isDisabled} className={' ' + className} type='submit'>
			{isLoading ? (
				<Loader2 className='h-6 w-6 animate-spin' />
			) : (
				children
			)}
		</Button>
	)
}

export default FormButton

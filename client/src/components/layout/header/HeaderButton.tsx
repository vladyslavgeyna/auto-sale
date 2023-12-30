import { Button } from '@/components/ui/button'

type PropsType = {
	iconComponent: React.ReactNode
	text: string
}

const HeaderButton = ({ iconComponent, text }: PropsType) => {
	return (
		<Button variant='default' className='text-base flex items-center gap-1'>
			{text}
			{iconComponent}
		</Button>
	)
}

export default HeaderButton

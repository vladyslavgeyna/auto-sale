import { Button } from '@/components/ui/Button'
import Link from 'next/link'

type PropsType = {
	iconComponent: React.ReactNode
	text: string
	href: string
}

const HeaderButton = ({ iconComponent, text, href }: PropsType) => {
	return (
		<Button className='!p-0' type='button' variant='default'>
			<Link
				href={href}
				className='text-base flex items-center gap-2 px-4 py-2'>
				{text}
				{iconComponent}
			</Link>
		</Button>
	)
}

export default HeaderButton

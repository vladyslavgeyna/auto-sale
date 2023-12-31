import { Button } from '@/components/ui/button'
import Link from 'next/link'

type PropsType = {
	iconComponent: React.ReactNode
	text: string
	href: string
}

const HeaderButton = ({ iconComponent, text, href }: PropsType) => {
	return (
		<Button type='button' variant='default'>
			<Link href={href} className='text-base flex items-center gap-1'>
				{text}
				{iconComponent}
			</Link>
		</Button>
	)
}

export default HeaderButton

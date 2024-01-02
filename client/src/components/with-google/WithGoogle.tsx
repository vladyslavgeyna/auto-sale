'use client'

import Image from 'next/image'
import { Button } from '../ui/Button'

type PropsType = {
	text: string
}

const WithGoogle = ({ text }: PropsType) => {
	const handleWithGoogleClick = () => {
		window.open(
			`${process.env.NEXT_PUBLIC_API_URL}/api/account/google-login`,
			'_self',
		)
	}
	return (
		<div>
			<Button
				onClick={handleWithGoogleClick}
				variant='outline'
				className='flex items-center gap-2'>
				<Image alt='Google' src='/google.svg' width='24' height='24' />
				{text}
			</Button>
		</div>
	)
}

export default WithGoogle

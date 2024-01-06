import Link from 'next/link'
import React from 'react'
import { Button } from '../ui/Button'

type PropsType = {
	text: string
	icon: React.ReactNode
}

const ActionLink = ({ text, icon }: PropsType) => {
	return (
		<Button type='button' className='w-full mt-3'>
			<Link
				className='w-full flex gap-2 items-center justify-center'
				href={'/'}>
				{icon}
				{text}
			</Link>
		</Button>
	)
}

export default ActionLink

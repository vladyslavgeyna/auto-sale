import Link from 'next/link'
import React from 'react'
import { Button } from '../ui/Button'

type PropsType = {
	text: string
	icon: React.ReactNode
	href: string
}

const ActionLink = ({ text, icon, href }: PropsType) => {
	return (
		<Button type='button' className='w-full mt-3'>
			<Link
				className='w-full flex gap-2 items-center justify-center'
				href={href}>
				{icon}
				{text}
			</Link>
		</Button>
	)
}

export default ActionLink

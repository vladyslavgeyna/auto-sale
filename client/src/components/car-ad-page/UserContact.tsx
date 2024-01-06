import React from 'react'

type PropsType = {
	text: string
	icon: React.ReactNode
	type: 'phone' | 'email' | 'none'
}

const UserContact = ({ text, icon, type }: PropsType) => {
	const linkPrefix = type === 'phone' ? 'tel:+38' : 'mailto:'

	const contactContent = (
		<>
			{icon}
			<p>{text}</p>
		</>
	)

	return (
		<div>
			{type === 'none' ? (
				<div className='flex gap-2 items-center'>{contactContent}</div>
			) : (
				<a
					href={linkPrefix + text}
					className='flex gap-2 items-center hover:scale-[1.03] transition-all duration-300'>
					{contactContent}
				</a>
			)}
		</div>
	)
}

export default UserContact

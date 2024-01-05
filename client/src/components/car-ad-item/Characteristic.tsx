import React from 'react'

type PropsType = {
	text: string
	icon: React.ReactNode
}

const Characteristic = ({ icon, text }: PropsType) => {
	return (
		<div className='flex items-center gap-2 text-sm'>
			<span className='!text-lg'>{icon}</span>
			<p>{text}</p>
		</div>
	)
}

export default Characteristic

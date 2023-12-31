import React from 'react'

type PropsType = {
	children: React.ReactNode
	className?: string
}

const Title = ({ children, className = '' }: PropsType) => {
	return (
		<h1
			className={
				'scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl ' +
				className
			}>
			{children}
		</h1>
	)
}

export default Title

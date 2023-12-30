import React from 'react'

const Wrapper = ({ children }: { children: React.ReactNode }) => {
	return (
		<div className='min-h-screen min-w-80 overflow-hidden flex flex-col'>
			{children}
		</div>
	)
}

export default Wrapper

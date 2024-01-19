const Typing = ({ isTyping }: { isTyping: boolean }) => {
	if (isTyping) {
		return (
			<div className='italic font-medium text-gray-500 animate-pulse'>
				<span className='ml-2'>Typing...</span>
			</div>
		)
	}

	return <div className='h-6' />
}

export default Typing

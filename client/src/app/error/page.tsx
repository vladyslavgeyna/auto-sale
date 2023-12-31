import Title from '@/components/ui/Title'

const Error = () => {
	return (
		<div className='text-center'>
			<Title className='mt-5'>500 Server Error</Title>
			<p className='mt-3 text-lg'>
				Sorry, there were an error on this page.
			</p>
			<p className='text-lg'>
				Please try again later. We are working on it.
			</p>
		</div>
	)
}

export default Error

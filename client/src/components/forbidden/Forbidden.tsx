import Title from '../ui/Title'

const Forbidden = ({ text }: { text?: string }) => {
	return (
		<div className='text-center'>
			<Title className='mt-5'>
				403
				<br />
				Forbidden
			</Title>{' '}
			{!text ? (
				<>
					<p className='mt-3 text-lg'>
						You are not allowed to access this page
					</p>
				</>
			) : (
				<p className='mt-3 text-lg'>{text}</p>
			)}
		</div>
	)
}

export default Forbidden

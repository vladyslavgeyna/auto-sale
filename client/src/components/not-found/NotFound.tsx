import Link from 'next/link'
import Title from '../ui/Title'

const NotFound = ({ text }: { text?: string }) => {
	return (
		<div className='text-center'>
			<Title className='mt-5'>
				404
				<br />
				Not Found
			</Title>
			{!text ? (
				<>
					<p className='mt-3 text-lg'>
						The page you are looking for does not exist.
					</p>
					<p className='text-lg'>
						Check the URL or{' '}
						<Link className='hover:underline' href='/'>
							<strong>go back to the homepage</strong>
						</Link>
					</p>
				</>
			) : (
				<p className='mt-3 text-lg'>{text}</p>
			)}
		</div>
	)
}

export default NotFound

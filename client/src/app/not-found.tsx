import Title from '@/components/ui/Title'
import Link from 'next/link'

const NotFound = () => {
	return (
		<div className='text-center'>
			<Title className='mt-5'>Not Found</Title>
			<p className='mt-3 text-lg'>
				The page you are looking for does not exist.
			</p>
			<p className='text-lg'>
				Check the URL or{' '}
				<Link className='hover:underline' href='/'>
					<strong>go back to the homepage</strong>
				</Link>
			</p>
		</div>
	)
}

export default NotFound

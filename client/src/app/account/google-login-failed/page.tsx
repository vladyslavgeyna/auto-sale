'use client'
import Title from '@/components/ui/Title'
import WithoutAuth from '@/hoc/WithoutAuth'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'

const GoogleLoginFailedPage = () => {
	const searchParams = useSearchParams()

	const errorMessage = searchParams.get('error')

	return (
		<WithoutAuth>
			<div className='text-center m-auto max-w-xl'>
				<Title className='mt-5'>Google login has failed</Title>
				{errorMessage && (
					<p className='mt-3 text-2xl font-bold rounded-lg border p-2'>
						{errorMessage}
					</p>
				)}
				<p className='mt-5 text-lg'>
					Try again later or use another email.
				</p>
				<p className='mt-3 text-lg'>
					Also you can try to{' '}
					<Link
						className='font-bold hover:underline'
						href={'/account/login'}>
						login in traditional way
					</Link>{' '}
					using email and password.
				</p>
			</div>
		</WithoutAuth>
	)
}

export default GoogleLoginFailedPage

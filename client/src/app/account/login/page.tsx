import LoginForm from '@/components/login-form/LoginForm'
import ResetPasswordUnlogged from '@/components/reset-password-unlogged/ResetPasswordUnlogged'
import Title from '@/components/ui/Title'
import WithGoogle from '@/components/with-google/WithGoogle'
import WithoutAuth from '@/hoc/WithoutAuth'
import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
	title: 'Auto Sale | Login',
	description: 'Sign in to Auto Sale',
}

const Login = () => {
	return (
		<WithoutAuth>
			<div>
				<Title className='text-center mt-5'>Authorization</Title>
				<LoginForm />
				<div className='max-w-lg mx-auto mt-3'>
					<ResetPasswordUnlogged />
				</div>
				<hr className='max-w-lg mx-auto mt-7' />
				<p className='mt-7 text-center text-lg'>
					Don't have account yet?{' '}
					<Link
						className='font-bold hover:underline'
						href={'/account/register'}>
						Sign up
					</Link>
				</p>
				<div className='text-center mt-3'>OR</div>
				<div className='flex justify-center mt-3'>
					<WithGoogle text='Sign in with Google' />
				</div>
			</div>
		</WithoutAuth>
	)
}

export default Login

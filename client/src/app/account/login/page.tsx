import LoginForm from '@/components/login-form/LoginForm'
import Title from '@/components/ui/Title'
import WithGoogle from '@/components/with-google/WithGoogle'
import Link from 'next/link'

const Login = () => {
	return (
		<div>
			<Title className='text-center mt-5'>Authorization</Title>
			<LoginForm />
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
	)
}

export default Login

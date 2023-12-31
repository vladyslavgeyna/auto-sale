import LoginForm from '@/components/login-form/LoginForm'
import Title from '@/components/ui/Title'
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
		</div>
	)
}

export default Login

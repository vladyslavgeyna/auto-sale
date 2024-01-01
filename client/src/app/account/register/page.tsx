import RegistrationForm from '@/components/registration-form/RegistrationForm'
import Title from '@/components/ui/Title'
import WithGoogle from '@/components/with-google/WithGoogle'
import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
	title: 'Auto Sale | Register',
	description: 'Register to Auto Sale',
}

const Register = () => {
	return (
		<div>
			<Title className='text-center mt-5'>Register</Title>
			<RegistrationForm />
			<hr className='max-w-lg mx-auto mt-7' />
			<p className='mt-7 text-center text-lg'>
				Already registered?{' '}
				<Link
					className='font-bold hover:underline'
					href={'/account/login'}>
					Sign in
				</Link>
			</p>
			<div className='text-center mt-3'>OR</div>
			<div className='flex justify-center mt-3'>
				<WithGoogle text='Sign up with Google' />
			</div>
		</div>
	)
}

export default Register

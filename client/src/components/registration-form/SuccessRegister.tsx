type PropsType = {
	email: string
}

const SuccessRegister = ({ email }: PropsType) => {
	return (
		<div className='mt-7 max-w-lg mx-auto text-center'>
			<p className='text-lg'>
				You have successfully registered. Please check your {email}{' '}
				email to confirm your account
			</p>
		</div>
	)
}

export default SuccessRegister

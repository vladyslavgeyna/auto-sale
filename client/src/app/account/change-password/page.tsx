import ChangePasswordForm from '@/components/change-password-form/ChangePasswordForm'
import Title from '@/components/ui/Title'
import RequireAuth from '@/hoc/RequireAuth'

const page = () => {
	return (
		<RequireAuth>
			<div>
				<Title className='text-center mt-5'>Change password</Title>
				<ChangePasswordForm />
			</div>
		</RequireAuth>
	)
}

export default page

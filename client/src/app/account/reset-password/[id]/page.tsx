import ResetPasswordForm from '@/components/reset-password-form/ResetPasswordForm'
import Title from '@/components/ui/Title'
import RequireAuth from '@/hoc/RequireAuth'

type PropsType = {
	params: {
		id: string
	}
}

const ResetPasswordPage = ({ params }: PropsType) => {
	const resetPasswordUniqueId = params.id

	return (
		<RequireAuth>
			<div>
				<Title className='text-center mt-5'>Reset password</Title>
				<ResetPasswordForm
					resetPasswordUniqueId={resetPasswordUniqueId}
				/>
			</div>
		</RequireAuth>
	)
}

export default ResetPasswordPage

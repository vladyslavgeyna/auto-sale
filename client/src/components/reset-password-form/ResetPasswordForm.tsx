'use client'

import { useHttpError } from '@/hooks/useHttpError'
import { useResetPassword } from '@/hooks/useResetPassword'
import { IResetPasswordInput } from '@/types/user/reset-password-input.interface'
import { PASSWORD_REGEXP } from '@/utils/validation'
import { SubmitHandler, useForm } from 'react-hook-form'
import FormButton from '../form-button/FormButton'
import FormError from '../form-error/FormError'
import HttpError from '../http-error/HttpError'
import { Input } from '../ui/Input'

const ResetPasswordForm = ({
	resetPasswordUniqueId,
}: {
	resetPasswordUniqueId: string
}) => {
	const { handleHttpError, httpError } = useHttpError()

	const {
		handleSubmit,
		register,
		reset,
		watch,
		formState: { errors, isValid, isDirty },
	} = useForm<IResetPasswordInput>({
		mode: 'onChange',
	})

	const {
		mutate: resetPassword,
		isError,
		isPending,
	} = useResetPassword(handleHttpError, reset)

	const onSubmit: SubmitHandler<
		IResetPasswordInput
	> = resetPasswordInputData => {
		resetPassword(resetPasswordInputData)
	}

	const isHttpError = httpError && isError

	return (
		<div className='mt-7 max-w-lg mx-auto'>
			{isHttpError && <HttpError httpError={httpError} />}
			<form
				onSubmit={handleSubmit(onSubmit)}
				className='max-w-lg mx-auto mt-7 flex flex-col gap-3'
				method='post'>
				<input
					required
					type='hidden'
					{...register('resetPasswordUniqueId', {
						required: 'Reset password unique id is required',
					})}
					value={resetPasswordUniqueId}
				/>
				<div>
					<Input
						type='password'
						placeholder='New password'
						{...register('password', {
							required: 'Password is required',
							pattern: {
								value: PASSWORD_REGEXP,
								message:
									'Password should contain at least 1 number, 1 uppercase letter and 1 lowercase letter',
							},
							minLength: {
								value: 6,
								message:
									'Password should be at least 6 symbols',
							},
							maxLength: {
								value: 50,
								message: 'Max password length is 50 symbols',
							},
						})}
					/>
					<FormError
						className='ml-1 mt-1'
						message={errors.password?.message}
					/>
				</div>
				<div>
					<Input
						type='password'
						placeholder='Confirm new password'
						{...register('passwordConfirm', {
							required: 'Confirm password is required',
							validate: (value: string) => {
								if (watch('password') !== value) {
									return "Passwords don't match"
								}
							},
						})}
					/>
					<FormError
						className='ml-1 mt-1'
						message={errors.passwordConfirm?.message}
					/>
				</div>
				<div>
					<FormButton
						isDisabled={!isValid && isDirty}
						className='w-full'
						isLoading={isPending}>
						Reset password
					</FormButton>
				</div>
			</form>
		</div>
	)
}

export default ResetPasswordForm

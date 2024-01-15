'use client'

import { useChangePassword } from '@/hooks/useChangePassword'
import { useHttpError } from '@/hooks/useHttpError'
import { IChangePasswordInput } from '@/types/user/change-password-input.interface'
import { PASSWORD_REGEXP } from '@/utils/validation'
import { SubmitHandler, useForm } from 'react-hook-form'
import FormButton from '../form-button/FormButton'
import FormError from '../form-error/FormError'
import HttpError from '../http-error/HttpError'
import ResetPassword from '../reset-password/ResetPassword'
import { Input } from '../ui/Input'

const ChangePasswordForm = () => {
	const { handleHttpError, httpError } = useHttpError()

	const {
		handleSubmit,
		register,
		reset,
		watch,
		formState: { errors, isValid, isDirty },
	} = useForm<IChangePasswordInput>({
		mode: 'onChange',
	})

	const {
		mutate: changePassword,
		isError,
		isPending,
	} = useChangePassword(handleHttpError, reset)

	const onSubmit: SubmitHandler<IChangePasswordInput> = loginInputData => {
		changePassword(loginInputData)
	}

	const isHttpError = httpError && isError

	return (
		<div className='mt-7 max-w-lg mx-auto'>
			{isHttpError && <HttpError httpError={httpError} />}
			<form
				onSubmit={handleSubmit(onSubmit)}
				className='max-w-lg mx-auto mt-7 flex flex-col gap-3'
				method='post'>
				<div>
					<Input
						type='password'
						placeholder='Current password'
						{...register('oldPassword', {
							required: 'Old password is required',
						})}
					/>
					<FormError
						className='ml-1 mt-1'
						message={errors.oldPassword?.message}
					/>
				</div>
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
						Change password
					</FormButton>
				</div>
			</form>
			<hr className='mt-3' />
			<ResetPassword />
		</div>
	)
}

export default ChangePasswordForm

'use client'

import { useHttpError } from '@/hooks/useHttpError'
import { useLogin } from '@/hooks/useLogin'
import { ILoginInput } from '@/types/user/login-input.interface'
import { EMAIL_REGEXP } from '@/utils/validation'
import { useSearchParams } from 'next/navigation'
import { SubmitHandler, useForm } from 'react-hook-form'
import FormButton from '../form-button/FormButton'
import FormError from '../form-error/FormError'
import HttpError from '../http-error/HttpError'
import { Input } from '../ui/Input'
import SuccessAccountVerifying from './SuccessAccountVerifying'

const LoginForm = () => {
	const { handleHttpError, httpError } = useHttpError()

	const searchParams = useSearchParams()

	const {
		handleSubmit,
		register,
		reset,
		formState: { errors, isValid, isDirty },
	} = useForm<ILoginInput>({
		mode: 'onChange',
	})

	const {
		mutate: login,
		isError,
		isPending,
	} = useLogin(handleHttpError, reset)

	const onSubmit: SubmitHandler<ILoginInput> = loginInputData => {
		login(loginInputData)
	}

	const isAccountVerified =
		searchParams.get('verified') && searchParams.get('verified') === 'true'

	const isHttpError = httpError && isError

	return (
		<>
			{isHttpError && (
				<HttpError
					className='mt-7 max-w-lg mx-auto'
					httpError={httpError}
				/>
			)}
			{isAccountVerified && <SuccessAccountVerifying />}
			<form
				onSubmit={handleSubmit(onSubmit)}
				className='max-w-lg mx-auto mt-7 flex flex-col gap-3'
				method='post'>
				<div>
					<Input
						type='email'
						placeholder='Email'
						{...register('email', {
							required: 'Email is required',
							pattern: {
								value: EMAIL_REGEXP,
								message: 'Please enter a valid email',
							},
						})}
					/>
					<FormError
						className='ml-1 mt-1'
						message={errors.email?.message}
					/>
				</div>
				<div>
					<Input
						type='password'
						placeholder='Password'
						{...register('password', {
							required: 'Password is required',
						})}
					/>
					<FormError
						className='ml-1 mt-1'
						message={errors.password?.message}
					/>
				</div>
				<div>
					<FormButton
						isDisabled={!isValid && isDirty}
						className='w-full'
						isLoading={isPending}>
						Log in
					</FormButton>
				</div>
			</form>
		</>
	)
}

export default LoginForm

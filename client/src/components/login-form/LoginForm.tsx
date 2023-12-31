'use client'

import accountService from '@/services/account.service'
import { useUserStore } from '@/store/user'
import { IHttpError } from '@/types/http-error.interface'
import { ILoginInput } from '@/types/user/login-input.interface'
import { EMAIL_REGEXP } from '@/utils/validation'
import { useMutation } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { useRouter, useSearchParams } from 'next/navigation'
import { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useShallow } from 'zustand/react/shallow'
import FormButton from '../form-button/FormButton'
import FormError from '../form-error/FormError'
import HttpError from '../http-error/HttpError'
import { Input } from '../ui/Input'

const LoginForm = () => {
	const [httpError, setHttpError] = useState<IHttpError | null>(null)

	const { setCredentials } = useUserStore(
		useShallow(state => ({
			setCredentials: state.setCredentials,
		})),
	)

	const searchParams = useSearchParams()

	const router = useRouter()

	const {
		handleSubmit,
		register,
		reset,
		formState: { errors, isValid },
	} = useForm<ILoginInput>({
		mode: 'onChange',
	})

	const {
		mutate: login,
		isError,
		isPending,
	} = useMutation({
		mutationKey: ['login'],
		mutationFn: accountService.login,
		onSuccess: ({ data }) => {
			console.log('data', data)

			reset()
			setCredentials(data)
			router.push('/')
		},
		onError: (error: AxiosError) => {
			const errorData = error.response?.data

			if (
				IHttpError.isHttpError(errorData) &&
				error.response?.status &&
				error.response?.status < 500
			) {
				setHttpError(errorData)
			} else {
				router.push('/error')
			}
		},
	})

	const onSubmit: SubmitHandler<ILoginInput> = loginInputData => {
		login(loginInputData)
	}

	return (
		<>
			{isError && httpError && (
				<HttpError
					className='mt-7 max-w-lg mx-auto'
					httpError={httpError}
				/>
			)}
			{searchParams.get('verified') &&
				searchParams.get('verified') === 'true' && (
					<div className='mt-7 max-w-lg mx-auto text-center'>
						<p className='text-lg'>
							Your email address is successfully verified <br />
							Now you can log in
						</p>
					</div>
				)}
			<form
				onSubmit={handleSubmit(onSubmit)}
				className='max-w-lg mx-auto mt-7 flex flex-col gap-3'
				method='post'>
				<div>
					<Input
						type='text'
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
						isDisabled={!isValid}
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

'use client'

import { useHttpError } from '@/hooks/useHttpError'
import { useRegister } from '@/hooks/useRegister'
import { IRegisterInput } from '@/types/user/register-input.interface'
import {
	ACCEPT_IMAGE_TYPES,
	EMAIL_REGEXP,
	MAX_FILE_SIZE,
	PASSWORD_REGEXP,
	PHONE_NUMBER_REGEXP,
} from '@/utils/validation'
import { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import FormButton from '../form-button/FormButton'
import FormError from '../form-error/FormError'
import HttpError from '../http-error/HttpError'
import { Input } from '../ui/Input'
import { Label } from '../ui/Label'
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from '../ui/Tooltip'
import SuccessRegister from './SuccessRegister'

const RegistrationForm = () => {
	const { handleHttpError, httpError } = useHttpError()

	const [email, setEmail] = useState<string>('')

	const {
		handleSubmit,
		register,
		reset,
		watch,
		getValues,
		formState: { errors, isValid, isDirty },
	} = useForm<IRegisterInput>({
		mode: 'onChange',
	})

	const {
		mutate: registerUser,
		isError,
		isPending,
		isSuccess,
	} = useRegister(handleHttpError, reset, () => setEmail(getValues('email')))

	const onSubmit: SubmitHandler<IRegisterInput> = registerInputData => {
		registerUser(registerInputData)
	}

	const isHttpError = httpError && isError

	return (
		<>
			{isHttpError && (
				<HttpError
					className='mt-7 max-w-lg mx-auto'
					httpError={httpError}
				/>
			)}
			{isSuccess && <SuccessRegister email={email} />}
			<form
				onSubmit={handleSubmit(onSubmit)}
				className='max-w-lg mx-auto mt-7 flex flex-col gap-3'
				encType='multipart/form-data'
				method='post'>
				<div>
					<Input
						type='text'
						placeholder='Name'
						{...register('name', {
							required: 'Name is required',
							minLength: {
								value: 2,
								message: 'Name should be at least 2 symbols',
							},
							maxLength: {
								value: 100,
								message: 'Max name length is 100 symbols',
							},
						})}
					/>
					<FormError
						className='ml-1 mt-1'
						message={errors.name?.message}
					/>
				</div>
				<div>
					<Input
						type='text'
						placeholder='Surname'
						{...register('surname', {
							required: 'Surname is required',
							minLength: {
								value: 2,
								message: 'Surname should be at least 2 symbols',
							},
							maxLength: {
								value: 100,
								message: 'Max surname length is 100 symbols',
							},
						})}
					/>
					<FormError
						className='ml-1 mt-1'
						message={errors.surname?.message}
					/>
				</div>
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
							pattern: {
								value: PASSWORD_REGEXP,
								message:
									'Password should contain at least 1 number, 1 uppercase letter and 1 lowercase letter',
							},
							minLength: {
								value: 6,
								message: 'Surname should be at least 6 symbols',
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
						placeholder='Confirm password'
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
					<TooltipProvider delayDuration={100}>
						<Tooltip>
							<TooltipTrigger asChild>
								<Input
									type='text'
									placeholder='Phone (optional)'
									{...register('phone', {
										pattern: {
											value: PHONE_NUMBER_REGEXP,
											message:
												'Please enter a valid phone number',
										},
									})}
								/>
							</TooltipTrigger>
							<TooltipContent>
								<p>
									Enter the phone number as follows:
									0671234567
								</p>
							</TooltipContent>
						</Tooltip>
					</TooltipProvider>
					<FormError
						className='ml-1 mt-1'
						message={errors.phone?.message}
					/>
				</div>
				<div>
					<Label className='ml-3' htmlFor='image'>
						Image (optional):
					</Label>
					<TooltipProvider delayDuration={100}>
						<Tooltip>
							<TooltipTrigger asChild>
								<Input
									accept='.jpg, .jpeg, .png'
									id='image'
									type='file'
									className='cursor-pointer mt-1'
									{...register('image', {
										validate: value => {
											if (value?.length) {
												const file = value[0]
												if (
													!ACCEPT_IMAGE_TYPES.some(
														t => t === file.type,
													)
												) {
													return 'Only png and jpeg files are valid.'
												}
												if (file.size > MAX_FILE_SIZE) {
													return 'Too large file size. Max file size is 5MB.'
												}
											}

											return true
										},
									})}
								/>
							</TooltipTrigger>
							<TooltipContent>
								<p>
									Choose an image file. Accepted file
									extensions: .png, .jpeg, .jpg. Max file
									size: 5MB.
								</p>
							</TooltipContent>
						</Tooltip>
					</TooltipProvider>
					<FormError
						className='ml-1 mt-1'
						message={errors.image?.message}
					/>
				</div>
				<div>
					<FormButton
						isDisabled={!isValid && isDirty}
						className='w-full'
						isLoading={isPending}>
						Register
					</FormButton>
				</div>
			</form>
		</>
	)
}

export default RegistrationForm

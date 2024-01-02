'use client'

import accountService from '@/services/account.service'
import { useUserStore } from '@/store/user'
import { IHttpError } from '@/types/http-error.interface'
import { IEditProfileInput } from '@/types/user/edit-profile-input.interface'
import { formatFileName } from '@/utils/utils'
import {
	EMAIL_REGEXP,
	PHONE_NUMBER_REGEXP,
	acceptImageTypes,
} from '@/utils/validation'
import { useMutation } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { useRouter } from 'next/navigation'
import { useRef, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useShallow } from 'zustand/react/shallow'
import FormButton from '../form-button/FormButton'
import FormError from '../form-error/FormError'
import HttpError from '../http-error/HttpError'
import { Avatar, AvatarImage } from '../ui/Avatar'
import { Input } from '../ui/Input'
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from '../ui/Tooltip'

const EditProfileForm = () => {
	const { user } = useUserStore(
		useShallow(state => ({
			user: state.user,
		})),
	)

	const [httpError, setHttpError] = useState<IHttpError | null>(null)

	const router = useRouter()

	const fileInputRef = useRef<HTMLInputElement>(null)

	const [image, setImage] = useState<File | null>()

	const {
		handleSubmit,
		register,
		reset,
		watch,
		getValues,
		setError,
		clearErrors,
		formState: { errors, isValid, isDirty },
	} = useForm<IEditProfileInput>({
		mode: 'onChange',
		defaultValues: {
			email: user?.email,
			name: user?.name,
			surname: user?.surname,
			phone: user?.phone || '',
		},
	})

	const {
		mutate: registerUser,
		isError,
		isPending,
		isSuccess,
	} = useMutation({
		mutationKey: ['edit-profile'],
		mutationFn: accountService.register,
		onSuccess: () => {
			reset()
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

	const onSubmit: SubmitHandler<IEditProfileInput> = registerInputData => {
		//registerUser(registerInputData)
	}

	const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const file = event.target.files?.[0]

		if (file) {
			if (!acceptImageTypes.some(t => t === file.type)) {
				setError('image', {
					message: 'Only png and jpeg files are valid.',
				})
				setImage(null)
				return
			}
			if (file.size > 5242880) {
				setError('image', {
					message: 'Too large file size. Max file size is 5MB.',
				})
				setImage(null)
				return
			}
			setImage(file)
		} else {
			clearErrors('image')
			setImage(null)
			return
		}
	}

	return (
		<>
			{isError && httpError && (
				<HttpError
					className='mt-7 max-w-lg mx-auto'
					httpError={httpError}
				/>
			)}
			{isSuccess && (
				<div className='mt-7 max-w-lg mx-auto text-center'>
					<p className='text-lg'>
						You have successfully registered. Please check your{' '}
						email to confirm your account
					</p>
				</div>
			)}
			<form
				onSubmit={handleSubmit(onSubmit)}
				className='max-w-lg mx-auto mt-10 flex flex-col gap-3'
				encType='multipart/form-data'
				method='post'>
				<div>
					<TooltipProvider delayDuration={100}>
						<Tooltip>
							<TooltipTrigger asChild>
								<Avatar
									onClick={e => {
										e.preventDefault()
										fileInputRef.current?.click()
									}}
									className='h-32 w-32 m-auto hover:cursor-pointer'>
									<AvatarImage
										src={
											user?.imageLink ||
											'/default_avatar.svg'
										}
										alt='User avatar'
									/>
								</Avatar>
							</TooltipTrigger>
							<TooltipContent>
								<p>
									Chose an image file. Accepted file
									extensions: .png, .jpeg, .jpg. Max file
									size: 5MB.
								</p>
							</TooltipContent>
						</Tooltip>
					</TooltipProvider>
				</div>
				<div>
					<Input
						accept='.jpg, .jpeg, .png'
						id='image'
						type='file'
						className='hidden'
						ref={fileInputRef}
						onChange={handleImageChange}
					/>
					<FormError
						className='ml-1 mt-1 text-center'
						message={errors.image?.message}
					/>
					{image && (
						<p className='ml-1 mt-1 text-center font-bold text-lg'>
							{formatFileName(image.name)}
						</p>
					)}
				</div>
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
					<TooltipProvider delayDuration={100}>
						<Tooltip>
							<TooltipTrigger asChild>
								<Input
									readOnly
									disabled
									type='email'
									placeholder='Email'
									{...register('email', {
										disabled: true,
										required: 'Email is required',
										pattern: {
											value: EMAIL_REGEXP,
											message:
												'Please enter a valid email',
										},
									})}
								/>
							</TooltipTrigger>
							<TooltipContent>
								<p>Email cannot be changed</p>
							</TooltipContent>
						</Tooltip>
					</TooltipProvider>
					<FormError
						className='ml-1 mt-1'
						message={errors.email?.message}
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
					<FormButton
						isDisabled={!isValid && isDirty}
						className='w-full'
						isLoading={isPending}>
						Save changes
					</FormButton>
				</div>
			</form>
		</>
	)
}

export default EditProfileForm

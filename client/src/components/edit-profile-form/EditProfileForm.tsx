'use client'

import { useEditProfile } from '@/hooks/useEditProfile'
import { useHttpError } from '@/hooks/useHttpError'
import { useUserStore } from '@/store/user'
import { IEditProfileInput } from '@/types/user/edit-profile-input.interface'
import { formatFileName } from '@/utils/utils'
import {
	ACCEPT_IMAGE_TYPES,
	EMAIL_REGEXP,
	MAX_FILE_SIZE,
	PHONE_NUMBER_REGEXP,
} from '@/utils/validation'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import { useRef, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { FaCamera } from 'react-icons/fa6'
import { useShallow } from 'zustand/react/shallow'
import HttpError from '../../components/http-error/HttpError'
import FormButton from '../form-button/FormButton'
import FormError from '../form-error/FormError'
import ResetPassword from '../reset-password/ResetPassword'
import { Avatar, AvatarImage } from '../ui/Avatar'
import { Button } from '../ui/Button'
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

	if (!user) {
		redirect('/')
	}

	const { handleHttpError, httpError } = useHttpError()

	const fileInputRef = useRef<HTMLInputElement>(null)

	const [image, setImage] = useState<File | null>()

	const {
		handleSubmit,
		register,
		reset,
		setError,
		clearErrors,
		formState: { errors, isValid, isDirty },
	} = useForm<IEditProfileInput>({
		mode: 'onChange',
		defaultValues: {
			email: user.email,
			name: user.name,
			surname: user.surname,
			phone: user.phone || '',
		},
	})

	const {
		mutate: editProfile,
		isError,
		isPending,
	} = useEditProfile(handleHttpError, reset, () => {
		setImage(null)
		clearErrors('image')
	})

	const onSubmit: SubmitHandler<IEditProfileInput> = editInputData => {
		editProfile({
			name: editInputData.name,
			surname: editInputData.surname,
			phone: editInputData.phone,
			image,
		})
	}

	const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const file = event.target.files?.[0]
		if (file) {
			if (!ACCEPT_IMAGE_TYPES.some(t => t === file.type)) {
				setError('image', {
					message: 'Only png and jpeg files are valid.',
				})
				setImage(null)
				return
			}
			if (file.size > MAX_FILE_SIZE) {
				setError('image', {
					message: 'Too large file size. Max file size is 5MB.',
				})
				setImage(null)
				return
			}
			clearErrors('image')
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
			<div className='max-w-lg mx-auto mt-10 '>
				<form
					onSubmit={handleSubmit(onSubmit)}
					className='flex flex-col gap-3'
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
										className='h-32 w-32 m-auto hover:cursor-pointer relative !overflow-visible'>
										<AvatarImage
											className='rounded-full object-cover'
											src={
												user.imageLink ||
												'/default_avatar.svg'
											}
											alt='User avatar'
										/>
										<div className='hover:scale-105 transition-all p-1.5 rounded-xl absolute w-10 h-10 bg-white -bottom-3 left-1/2 -translate-x-2/4'>
											<FaCamera className='w-full h-full' />
										</div>
									</Avatar>
								</TooltipTrigger>
								<TooltipContent>
									<p>
										Click to choose an image file. Accepted
										file extensions: .png, .jpeg, .jpg. Max
										file size: 5MB.
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
					<div className='mt-6'>
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
						<Input
							type='text'
							placeholder='Name'
							{...register('name', {
								required: 'Name is required',
								minLength: {
									value: 2,
									message:
										'Name should be at least 2 symbols',
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
									message:
										'Surname should be at least 2 symbols',
								},
								maxLength: {
									value: 100,
									message:
										'Max surname length is 100 symbols',
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
				<hr className='mt-3 mb-3' />
				<Button variant='secondary' className='w-full'>
					<Link href={'/account/change-password'}>
						Change password
					</Link>
				</Button>
				<ResetPassword />
			</div>
		</>
	)
}

export default EditProfileForm

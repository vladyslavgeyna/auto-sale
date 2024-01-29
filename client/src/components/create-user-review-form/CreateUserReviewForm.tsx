'use client'

import { useCreateUserReview } from '@/hooks/useCreateUserReview'
import { useUserStore } from '@/store/user'
import ICreateUserReviewInput from '@/types/user-review/create-user-review-input.interface'
import { IUser } from '@/types/user/user.interface'
import { redirect } from 'next/navigation'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useShallow } from 'zustand/react/shallow'
import FormButton from '../form-button/FormButton'
import FormError from '../form-error/FormError'
import { Input } from '../ui/Input'
import { Label } from '../ui/Label'
import { Textarea } from '../ui/Textarea'

const CreateUserReviewForm = ({ userTo }: { userTo: IUser }) => {
	const { user } = useUserStore(
		useShallow(state => ({
			user: state.user,
		})),
	)

	if (!user) {
		redirect('/')
	}

	const {
		handleSubmit,
		register,
		reset,
		formState: { errors, isValid, isDirty },
	} = useForm<ICreateUserReviewInput>({
		mode: 'onChange',
	})

	const { mutate: createUserReview, isPending } = useCreateUserReview(
		userTo,
		reset,
	)

	const onSubmit: SubmitHandler<
		ICreateUserReviewInput
	> = userReviewInputData => {
		createUserReview(userReviewInputData)
	}

	return (
		<div className='mt-7 max-w-lg mx-auto'>
			<form
				onSubmit={handleSubmit(onSubmit)}
				className='max-w-lg mx-auto mt-7 flex flex-col gap-3'
				method='post'>
				<input
					required
					type='hidden'
					{...register('userFromId', {
						required: true,
					})}
					value={user.id}
				/>
				<input
					required
					type='hidden'
					{...register('userToId', {
						required: true,
					})}
					value={userTo.id}
				/>
				<div>
					<Label className='ml-3' htmlFor='title'>
						Review title:
					</Label>
					<Input
						id='title'
						type='text'
						className='mt-1'
						{...register('title', {
							required: 'Title is required',
							minLength: {
								value: 3,
								message: 'Title should be at least 3 symbols',
							},
							maxLength: {
								value: 50,
								message: 'Max title length is 50 symbols',
							},
						})}
					/>
					<FormError
						className='ml-1 mt-1'
						message={errors.title?.message}
					/>
				</div>
				<div>
					<Label className='ml-3' htmlFor='text'>
						Review text:
					</Label>
					<Textarea
						id='text'
						className='mt-1 min-h-28'
						{...register('text', {
							required: 'Text is required',
							minLength: {
								value: 10,
								message: 'Text should be at least 10 symbols',
							},
							maxLength: {
								value: 300,
								message: 'Max text length is 300 symbols',
							},
						})}
					/>
					<FormError
						className='ml-1 mt-1'
						message={errors.text?.message}
					/>
				</div>
				<div>
					<FormButton
						isDisabled={!isValid && isDirty}
						className='w-full'
						isLoading={isPending}>
						Leave review
					</FormButton>
				</div>
			</form>
		</div>
	)
}

export default CreateUserReviewForm

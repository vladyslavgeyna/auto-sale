'use client'
import FormButton from '@/components/form-button/FormButton'
import FormError from '@/components/form-error/FormError'
import { Input } from '@/components/ui/Input'
import { useCreateCarBrand } from '@/hooks/useCreateCarBrand'
import { SubmitHandler, useForm } from 'react-hook-form'

const CreateCarBrandPage = () => {
	const {
		handleSubmit,
		register,
		reset,
		formState: { errors, isValid, isDirty },
	} = useForm<{ name: string }>({
		mode: 'onChange',
	})

	const { mutate: create, isPending } = useCreateCarBrand(reset)

	const onSubmit: SubmitHandler<{ name: string }> = createCarBrandData => {
		create(createCarBrandData.name)
	}

	return (
		<div>
			<form
				onSubmit={handleSubmit(onSubmit)}
				className='flex flex-col gap-3'
				method='post'>
				<div>
					<Input
						type='text'
						placeholder='Car brand name'
						{...register('name', {
							required: 'Name is required',
						})}
					/>
					<FormError
						className='ml-1 mt-1'
						message={errors.name?.message}
					/>
				</div>
				<div>
					<FormButton
						isDisabled={!isValid && isDirty}
						className='w-full'
						isLoading={isPending}>
						Create
					</FormButton>
				</div>
			</form>
		</div>
	)
}

export default CreateCarBrandPage

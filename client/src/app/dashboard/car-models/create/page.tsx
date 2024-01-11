'use client'
import FormSelect from '@/components/create-car-ad-form/FormSelect'
import FormButton from '@/components/form-button/FormButton'
import FormError from '@/components/form-error/FormError'
import Loader from '@/components/loader/Loader'
import { Input } from '@/components/ui/Input'
import { useCreateCarModel } from '@/hooks/useCreateCarModel'
import { useGetCarBrands } from '@/hooks/useGetCarBrands'
import { ICreateCarModelInput } from '@/types/car-model/create-car-model-input.interface'
import { redirect } from 'next/navigation'
import { SubmitHandler, useForm } from 'react-hook-form'

const CreateCarModelPage = () => {
	const {
		handleSubmit,
		register,
		reset,
		formState: { errors, isValid, isDirty },
	} = useForm<ICreateCarModelInput>({
		mode: 'onChange',
	})

	const { mutate: create, isPending } = useCreateCarModel(reset)

	const {
		data: carBrands,
		isLoading,
		isSuccess,
		isError,
		isFetching,
	} = useGetCarBrands()

	if (isLoading || isFetching) {
		return (
			<div className='flex justify-center mt-5'>
				<Loader />
			</div>
		)
	}

	if (!isSuccess || isError) {
		redirect('/error')
	}

	const onSubmit: SubmitHandler<
		ICreateCarModelInput
	> = createCarModelData => {
		create(createCarModelData)
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
						placeholder='Car model name'
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
					<FormSelect
						register={register('carBrandId', {
							required: 'Car brand is required',
						})}
						items={carBrands.map(item => ({
							key: item.id.toString(),
							value: item.name,
						}))}
						placeholder='Select car brand'
					/>
					<FormError
						className='ml-1 mt-1'
						message={errors.carBrandId?.message}
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

export default CreateCarModelPage

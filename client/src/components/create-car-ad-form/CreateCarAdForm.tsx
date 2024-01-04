'use client'

import { useCreateCarAd } from '@/hooks/useCreateCarAd'
import { useGetCarAdditionalData } from '@/hooks/useGetCarAdditionalData'
import { useHttpError } from '@/hooks/useHttpError'
import carModelService from '@/services/car-model.service'
import { ICreateCarAdInput } from '@/types/car-ad/create-car-ad-input.interface'
import { IEnum } from '@/types/enum.interface'
import { CURRENT_YEAR, getArrayInRange } from '@/utils/utils'
import {
	ACCEPT_IMAGE_TYPES,
	MAX_FILE_SIZE,
	MAX_IMAGES_COUNT,
} from '@/utils/validation'
import { redirect } from 'next/navigation'
import React, { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import FormButton from '../form-button/FormButton'
import FormError from '../form-error/FormError'
import HttpError from '../http-error/HttpError'
import Loader from '../loader/Loader'
import { Input } from '../ui/Input'
import { Label } from '../ui/Label'
import { Textarea } from '../ui/Textarea'
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from '../ui/Tooltip'
import FormCategoryLabel from './FormCategoryLabel'
import FormSelect from './FormSelect'
import FormSeparator from './FormSeparator'
import ImagePreview from './ImagePreview'

const CreateCarAdForm = () => {
	const { handleHttpError, httpError } = useHttpError()

	const [images, setImages] = useState<FileList | null>(null)

	const [isGetCarModelsError, setIsGetCarModelsError] = useState(false)

	const [carModels, setCarModel] = useState<IEnum[]>([])

	const {
		handleSubmit,
		register,
		reset,
		setError,
		clearErrors,
		formState: { errors, isValid, isDirty },
	} = useForm<ICreateCarAdInput>({
		mode: 'onChange',
	})

	const {
		data: carAdditionalData,
		isLoading,
		isSuccess: isGettingAdditionalDataSuccess,
		isError: isGettingAdditionalDataError,
	} = useGetCarAdditionalData()

	const {
		mutate: createCarAd,
		isError,
		isPending,
		isSuccess,
	} = useCreateCarAd(handleHttpError, () => {
		reset()
		setImages(null)
		setCarModel([])
	})

	const onSubmit: SubmitHandler<ICreateCarAdInput> = createCarAdInputData => {
		createCarAd({
			...createCarAdInputData,
			images: images,
		})
	}

	const onCarBrandChange = async (
		event: React.ChangeEvent<HTMLSelectElement>,
	) => {
		try {
			const carBrandId = Number(event.target.value)
			const data = await carModelService.getAll(carBrandId)
			setCarModel(data.data)
		} catch (error) {
			setIsGetCarModelsError(true)
		}
	}

	const handleImagesChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const files = event.target.files

		if (files && files.length > 0) {
			if (files.length > MAX_IMAGES_COUNT) {
				setError('images', {
					message: `Maximum images count is ${MAX_IMAGES_COUNT}.`,
				})
				setImages(null)
				return
			}
			for (let i = 0; i < files.length; i++) {
				if (!ACCEPT_IMAGE_TYPES.some(t => t === files[0].type)) {
					setError('images', {
						message: 'Only png and jpeg files are valid.',
					})
					setImages(null)
					return
				}
				if (files[0].size > MAX_FILE_SIZE) {
					setError('images', {
						message:
							'One or more files are too large. Max file size is 5MB.',
					})
					setImages(null)
					return
				}
			}
			clearErrors('images')
			setImages(files)
		} else {
			setError('images', {
				message: 'Images are required.',
			})
			setImages(null)
			return
		}
	}

	const isHttpError = httpError && isError

	if (isLoading) {
		return (
			<div className='flex justify-center my-5'>
				<Loader />
			</div>
		)
	}

	if (
		!isGettingAdditionalDataSuccess ||
		isGettingAdditionalDataError ||
		isGetCarModelsError
	) {
		redirect('/error')
	}

	return (
		<>
			{isHttpError && (
				<HttpError
					className='mt-7 max-w-lg mx-auto'
					httpError={httpError}
				/>
			)}
			<form
				onSubmit={handleSubmit(onSubmit)}
				className='max-w-5xl mx-auto mt-7 flex flex-col gap-3'
				encType='multipart/form-data'
				method='post'>
				<FormCategoryLabel>Add your car images:</FormCategoryLabel>
				<div>
					<Label className='ml-3' htmlFor='image'>
						Choose car images (maximum images count is{' '}
						{MAX_IMAGES_COUNT})
					</Label>
					<TooltipProvider delayDuration={100}>
						<Tooltip>
							<TooltipTrigger asChild>
								<Input
									multiple
									accept='.jpg, .jpeg, .png'
									id='image'
									type='file'
									className='cursor-pointer mt-1'
									onChange={handleImagesChange}
								/>
							</TooltipTrigger>
							<TooltipContent>
								<p>
									Accepted file extensions: .png, .jpeg, .jpg.
									Maximum single file size: 5MB.
								</p>
							</TooltipContent>
						</Tooltip>
					</TooltipProvider>
					<FormError
						className='ml-1 mt-1'
						message={errors.images?.message}
					/>
				</div>
				{images && (
					<div className='flex gap-2'>
						{Array.from(images).map((image, index) => (
							<div
								className='flex flex-col items-center'
								key={index}>
								<ImagePreview
									url={URL.createObjectURL(image)}
								/>
								<label className='mt-2 cursor-pointer'>
									<input
										{...register('mainImageName', {
											required: 'Main image is required',
										})}
										type='radio'
										value={image.name}
										defaultChecked={index === 0}
									/>{' '}
									main image
								</label>
							</div>
						))}
					</div>
				)}
				<FormSeparator />
				<FormCategoryLabel>Basic information:</FormCategoryLabel>
				<div>
					<FormSelect
						onChange={onCarBrandChange}
						register={register('carBrandId', {
							required: 'Car brand is required',
						})}
						items={carAdditionalData.carBrands
							.map(item => ({
								key: item.id.toString(),
								value: item.value,
							}))
							.concat({ key: '3', value: 'Volks' })}
						placeholder='Select car brand'
					/>
					<FormError
						className='ml-1 mt-1'
						message={errors.carBrandId?.message}
					/>
				</div>
				<div>
					<FormSelect
						register={register('carModelId', {
							required: 'Car model is required',
						})}
						items={carModels.map(item => ({
							key: item.id.toString(),
							value: item.value,
						}))}
						placeholder='Select car model'
					/>
					<FormError
						className='ml-1 mt-1'
						message={errors.carModelId?.message}
					/>
				</div>
				<div>
					<FormSelect
						register={register('yearOfProduction', {
							required: 'Year of production is required',
							min: {
								value: 1900,
								message:
									'Year of production should be at least 1900',
							},
							max: {
								value: CURRENT_YEAR,
								message: `Year of production should be maximum ${CURRENT_YEAR}`,
							},
						})}
						items={getArrayInRange(1900, CURRENT_YEAR)
							.reverse()
							.map(item => ({
								key: item.toString(),
								value: item.toString(),
							}))}
						placeholder='Select year of production'
					/>
					<FormError
						className='ml-1 mt-1'
						message={errors.yearOfProduction?.message}
					/>
				</div>
				<div>
					<TooltipProvider delayDuration={100}>
						<Tooltip>
							<TooltipTrigger asChild>
								<Input
									type='text'
									placeholder='Mileage (thousands km)'
									{...register('mileage', {
										required: 'Mileage is required',
										min: {
											value: 0,
											message:
												'Year of production should be at least 0',
										},
										max: {
											value: 999,
											message: `Year of production should be maximum 999`,
										},
										pattern: {
											value: /^(0|[1-9]\d{0,2})$/,
											message: `Invalid mileage. It should be a number between 0 and 999 and should contain only digits`,
										},
									})}
								/>
							</TooltipTrigger>
							<TooltipContent>
								<p>
									Enter the mileage in thousands of
									kilometers. Example: 220 = 220000 km
								</p>
							</TooltipContent>
						</Tooltip>
					</TooltipProvider>
					<FormError
						className='ml-1 mt-1'
						message={errors.mileage?.message}
					/>
				</div>
				<div>
					<FormSelect
						register={register('region', {
							required: 'Region is required',
						})}
						items={carAdditionalData.regions.map(item => ({
							key: item.id.toString(),
							value: item.value,
						}))}
						placeholder='Select region where the car is located'
					/>
					<FormError
						className='ml-1 mt-1'
						message={errors.region?.message}
					/>
				</div>
				<FormSeparator />
				<FormCategoryLabel>
					Characteristics of the car:
				</FormCategoryLabel>
				<div>
					<FormSelect
						register={register('transmission', {
							required: 'Transmission is required',
						})}
						items={carAdditionalData.transmissions.map(item => ({
							key: item.id.toString(),
							value: item.value,
						}))}
						placeholder='Select transmission'
					/>
					<FormError
						className='ml-1 mt-1'
						message={errors.transmission?.message}
					/>
				</div>
				<div>
					<FormSelect
						register={register('fuel', {
							required: 'Fuel is required',
						})}
						items={carAdditionalData.fuels.map(item => ({
							key: item.id.toString(),
							value: item.value,
						}))}
						placeholder='Select fuel type'
					/>
					<FormError
						className='ml-1 mt-1'
						message={errors.fuel?.message}
					/>
				</div>
				<div>
					<TooltipProvider delayDuration={100}>
						<Tooltip>
							<TooltipTrigger asChild>
								<Input
									type='text'
									placeholder='Engine capacity (in liters)'
									{...register('engineCapacity', {
										required: 'Engine capacity is required',
										min: {
											value: 0,
											message:
												'Engine capacity should be at least 0',
										},
										max: {
											value: 50,
											message: `Engine capacity should be maximum 50`,
										},
										pattern: {
											value: /^(?:[0-9]|[1-4][0-9]|50)(?:\.\d{1})?$/,
											message:
												'Invalid engine capacity format. It should be a number with one decimal place. And use a dot as a separator.',
										},
									})}
								/>
							</TooltipTrigger>
							<TooltipContent>
								<p>
									Enter the engine capacity in liters.
									Example: 1.6. Use a dot as a separator.
								</p>
							</TooltipContent>
						</Tooltip>
					</TooltipProvider>
					<FormError
						className='ml-1 mt-1'
						message={errors.engineCapacity?.message}
					/>
				</div>
				<div>
					<FormSelect
						register={register('wheelDrive', {
							required: 'Wheel drive is required',
						})}
						items={carAdditionalData.wheelDrives.map(item => ({
							key: item.id.toString(),
							value: item.value,
						}))}
						placeholder='Select wheel drive'
					/>
					<FormError
						className='ml-1 mt-1'
						message={errors.wheelDrive?.message}
					/>
				</div>
				<div>
					<FormSelect
						register={register('color', {
							required: 'Color is required',
						})}
						items={carAdditionalData.colors.map(item => ({
							key: item.id.toString(),
							value: item.value,
						}))}
						placeholder='Select color'
					/>
					<FormError
						className='ml-1 mt-1'
						message={errors.color?.message}
					/>
				</div>
				<div>
					<FormSelect
						register={register('numberOfSeats', {
							required: 'Number of seats is required',
							min: {
								value: 1,
								message: 'Number of seats should be at least 1',
							},
							max: {
								value: 60,
								message: `Number of seats should be maximum 60`,
							},
						})}
						items={getArrayInRange(1, 60).map(item => ({
							key: item.toString(),
							value: item.toString(),
						}))}
						placeholder='Select number of seats'
					/>
					<FormError
						className='ml-1 mt-1'
						message={errors.numberOfSeats?.message}
					/>
				</div>
				<FormSeparator />
				<FormCategoryLabel>Additional options:</FormCategoryLabel>
				<div>
					<Label className='ml-3' htmlFor='additionalOptions'>
						Additional options, separated by commas (optional, leave
						blank if you don't want to add any options)
					</Label>
					<Input
						id='additionalOptions'
						className='mt-1'
						type='text'
						placeholder='Example: ABS, ESP, Air conditioning'
						{...register('additionalOptions', {
							minLength: {
								value: 2,
								message:
									'Additional options should be minimum 2 characters long',
							},
							maxLength: {
								value: 150,
								message: `Additional options should be maximum 150 characters long`,
							},
						})}
					/>
					<FormError
						className='ml-1 mt-1'
						message={errors.additionalOptions?.message}
					/>
				</div>
				<FormSeparator />
				<FormCategoryLabel>Description of the car:</FormCategoryLabel>
				<div>
					<Label className='ml-3' htmlFor='title'>
						Ad title (provide the main details)
					</Label>
					<Input
						id='title'
						className='mt-1'
						type='text'
						placeholder='Example: BMW X5 2020 xDrive M Sport'
						{...register('title', {
							required: 'Text is required',
							minLength: {
								value: 3,
								message:
									'Title should be minimum 3 characters long',
							},
							maxLength: {
								value: 50,
								message: `Title should be maximum 150 characters long`,
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
						Ad text (car description)
					</Label>
					<Textarea
						id='text'
						className='mt-1 min-h-28'
						{...register('text', {
							required: 'Text is required',
							minLength: {
								value: 10,
								message:
									'Text should be minimum 10 characters long',
							},
							maxLength: {
								value: 1000,
								message: `Text should be maximum 1000 characters long`,
							},
						})}
					/>
					<FormError
						className='ml-1 mt-1'
						message={errors.text?.message}
					/>
				</div>
				<FormSeparator />
				<FormCategoryLabel>Price:</FormCategoryLabel>
				<div>
					<Label className='ml-3' htmlFor='price'>
						Price in USD, enter only digits
					</Label>
					<Input
						id='price'
						className='mt-1'
						type='text'
						placeholder='Example: 7500'
						{...register('price', {
							required: 'Price is required',
							min: {
								value: 1,
								message: 'Price should be at least 1',
							},
							max: {
								value: 100000000,
								message: `Too high price`,
							},
						})}
					/>
					<FormError
						className='ml-1 mt-1'
						message={errors.price?.message}
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

export default CreateCarAdForm

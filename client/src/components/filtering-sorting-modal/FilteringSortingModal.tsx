import carModelService from '@/services/car-model.service'
import { IGetFilteringSortingDataOutput } from '@/types/car-ad/get-filtering-sorting-data-output.interface'
import { IEnum } from '@/types/enum.interface'
import { CURRENT_YEAR, getArrayInRange } from '@/utils/utils'
import {
	redirect,
	usePathname,
	useRouter,
	useSearchParams,
} from 'next/navigation'
import { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import FormSelect, {
	FormSelectWithDefault,
	SelectItemType,
} from '../create-car-ad-form/FormSelect'
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from '../ui/AlertDialog'
import { Button } from '../ui/Button'
import { Input } from '../ui/Input'
import { Label } from '../ui/Label'

type FilteringSortingFormType = {
	carBrandId?: string | number
	carModelId?: string | number
	region?: string | number
	yearFrom?: string | number
	yearTo?: string | number
	priceFrom?: string | number
	priceTo?: string | number
	orderBy?: string | number
}

const getDefaultYearsArray = () =>
	getArrayInRange(1900, CURRENT_YEAR)
		.reverse()
		.map(item => ({
			key: item.toString(),
			value: item.toString(),
		}))

const getDefaultValue = (value: string | null, items: IEnum[]) => {
	let resultItem = Number(value) || undefined
	if (resultItem) {
		const exists = items.some(item => item.id === resultItem)
		if (exists) {
			return resultItem
		}
	}
	return undefined
}

const FilteringSortingModal = ({
	data,
	carModels,
	setCarModels,
}: {
	data: IGetFilteringSortingDataOutput
	carModels: IEnum[]
	setCarModels: React.Dispatch<React.SetStateAction<IEnum[] | undefined>>
}) => {
	const [yearFromArray, setYearFromArray] = useState<SelectItemType[]>(
		getDefaultYearsArray(),
	)
	const [yearToArray, setYearToArray] = useState<SelectItemType[]>(
		getDefaultYearsArray(),
	)

	const router = useRouter()
	const searchParams = useSearchParams()
	const pathname = usePathname()
	const [isGetCarModelsError, setIsGetCarModelsError] = useState(false)

	const resetYearArrays = () => {
		setYearFromArray(getDefaultYearsArray())
		setYearToArray(getDefaultYearsArray())
	}

	const { handleSubmit, register, reset, getValues } =
		useForm<FilteringSortingFormType>({
			mode: 'onChange',
			defaultValues: {
				region: getDefaultValue(
					searchParams.get('region'),
					data.regions,
				),
				carBrandId: getDefaultValue(
					searchParams.get('carBrandId'),
					data.carBrands,
				),
				carModelId: getDefaultValue(
					searchParams.get('carModelId'),
					carModels,
				),
				yearFrom: Number(searchParams.get('yearFrom')) || undefined,
				yearTo: Number(searchParams.get('yearTo')) || undefined,
				priceFrom: Number(searchParams.get('priceFrom')) || undefined,
				priceTo: Number(searchParams.get('priceTo')) || undefined,
				orderBy: getDefaultValue(
					searchParams.get('orderBy'),
					data.orderByOptions,
				),
			},
		})

	const onCarBrandChange = async (
		event: React.ChangeEvent<HTMLSelectElement>,
	) => {
		try {
			const carBrandId = Number(event.target.value)
			const data = await carModelService.getAll(carBrandId)
			setCarModels(data.data)
			reset({
				carModelId: '',
			})
		} catch (error) {
			setIsGetCarModelsError(true)
		}
	}

	if (isGetCarModelsError) {
		redirect('/error')
	}

	const handleReset = () => {
		reset({
			region: '',
			carBrandId: '',
			carModelId: '',
			yearFrom: '',
			yearTo: '',
			priceFrom: '',
			priceTo: '',
			orderBy: '',
		})
		setCarModels([])
		resetYearArrays()
		router.push('/')
	}

	const onSubmit: SubmitHandler<
		FilteringSortingFormType
	> = filteringSortingData => {
		const params = new URLSearchParams(searchParams.toString())

		for (const key in filteringSortingData) {
			if (key in filteringSortingData) {
				if (
					filteringSortingData[key as keyof FilteringSortingFormType]
				) {
					params.set(
						key,
						String(
							filteringSortingData[
								key as keyof FilteringSortingFormType
							],
						),
					)

					params.toString()
				}
			}
		}
		router.push(pathname + '?' + params.toString())
	}

	const handleYearToSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
		const array = getArrayInRange(1900, Number(e.target.value))
			.reverse()
			.map(item => ({
				key: item.toString(),
				value: item.toString(),
			}))
		setYearFromArray(array)
	}

	const handleYearFromSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
		const array = getArrayInRange(Number(e.target.value), CURRENT_YEAR)
			.reverse()
			.map(item => ({
				key: item.toString(),
				value: item.toString(),
			}))
		setYearToArray(array)
	}

	return (
		<AlertDialog>
			<AlertDialogTrigger asChild>
				<Button
					className='min-w-[83px] w-full sm:w-[initial]'
					type='button'>
					Filtering and sorting
				</Button>
			</AlertDialogTrigger>
			<AlertDialogContent className='md:min-w-[750px]'>
				<form
					className='grid w-full gap-3 bg-background p-1'
					onSubmit={handleSubmit(onSubmit)}
					method='post'>
					<AlertDialogCancel
						type='button'
						className='hover:bg-inherit hover:text-slate-700 border-none absolute top-0 right-0'>
						&#88;
					</AlertDialogCancel>
					<AlertDialogHeader>
						<AlertDialogTitle>
							Filtering and sorting
						</AlertDialogTitle>
						<hr />
						<div className='flex-col lg:flex-row flex gap-3'>
							<div className='flex flex-col gap-3 lg:w-1/2'>
								<div>
									<FormSelect
										onChange={onCarBrandChange}
										register={register('carBrandId')}
										items={data.carBrands.map(item => ({
											key: item.id.toString(),
											value: item.value,
										}))}
										placeholder='Car brand'
									/>
								</div>
								<div>
									<FormSelect
										register={register('carModelId')}
										items={carModels.map(item => ({
											key: item.id.toString(),
											value: item.value,
										}))}
										placeholder='Car model'
									/>
								</div>
								<div>
									<FormSelect
										register={register('region')}
										items={data.regions.map(item => ({
											key: item.id.toString(),
											value: item.value,
										}))}
										placeholder='Region'
									/>
								</div>
							</div>
							<div className='flex flex-col gap-3 lg:w-1/2'>
								<div className='flex items-center gap-1'>
									<Label>Year:</Label>
									<FormSelect
										onChange={handleYearFromSelect}
										register={register('yearFrom')}
										items={yearFromArray}
										placeholder='From'
									/>
									<FormSelect
										onChange={handleYearToSelect}
										register={register('yearTo')}
										items={yearToArray}
										placeholder='To'
									/>
								</div>
								<div className='flex items-center gap-1'>
									<Label htmlFor='priceFrom'>
										Price&nbsp;$:
									</Label>
									<Input
										id='priceFrom'
										type='text'
										placeholder='From'
										{...register('priceFrom', {
											pattern: /^[1-9]\d*$/,
											min: 1,
											max: 100000000,
										})}
										onBlur={() => {
											if (
												getValues('priceTo') &&
												getValues('priceFrom') &&
												Number(getValues('priceFrom')) >
													Number(getValues('priceTo'))
											) {
												reset({
													priceTo: '',
												})
											}
										}}
										onChange={e => {
											const value =
												e.target.value.replace(
													/\D/g,
													'',
												)
											reset({
												priceFrom: value,
											})
										}}
									/>
									<Input
										id='priceTo'
										type='text'
										placeholder='To'
										{...register('priceTo', {
											pattern: /^[1-9]\d*$/,
											min: 1,
											max: 100000000,
										})}
										onBlur={() => {
											if (
												getValues('priceFrom') &&
												getValues('priceTo') &&
												Number(getValues('priceTo')) <
													Number(
														getValues('priceFrom'),
													)
											) {
												reset({
													priceFrom: '',
												})
											}
										}}
										onChange={e => {
											const value =
												e.target.value.replace(
													/\D/g,
													'',
												)

											reset({
												priceTo: value,
											})
										}}
									/>
								</div>
								<div className='flex items-center gap-1'>
									<Label>Order&nbsp;by:</Label>
									<FormSelectWithDefault
										register={register('orderBy')}
										items={data.orderByOptions.map(
											item => ({
												key: item.id.toString(),
												value: item.value,
											}),
										)}
									/>
								</div>
							</div>
						</div>
					</AlertDialogHeader>
					<hr />
					<AlertDialogFooter className='gap-2'>
						<AlertDialogCancel type='button' className='!m-0'>
							Cancel
						</AlertDialogCancel>
						<AlertDialogAction
							className='!m-0'
							onClick={handleReset}
							type='button'>
							Reset
						</AlertDialogAction>
						<AlertDialogAction type='submit' className='!m-0'>
							Apply
						</AlertDialogAction>
					</AlertDialogFooter>
				</form>
			</AlertDialogContent>
		</AlertDialog>
	)
}

export default FilteringSortingModal

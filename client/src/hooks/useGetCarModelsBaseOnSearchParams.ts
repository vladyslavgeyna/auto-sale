import carModelService from '@/services/car-model.service'
import { IEnum } from '@/types/enum.interface'
import { useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'

export const useSetCarModelsBaseOnSearchParams = (
	setCarModels: (carModels: IEnum[]) => void,
) => {
	const searchParams = useSearchParams()
	const [areModelsLoading, setAreModelsLoading] = useState(true)
	const [isModelsError, setIsModelsError] = useState(false)

	useEffect(() => {
		const carBrandId = Number(searchParams.get('carBrandId'))
		if (carBrandId) {
			setAreModelsLoading(true)
			carModelService
				.getAll(carBrandId)
				.then(({ data }) => {
					setCarModels(data)
				})
				.catch(() => {
					setIsModelsError(true)
				})
				.finally(() => {
					setAreModelsLoading(false)
					setIsModelsError(false)
				})
		} else {
			setCarModels([])
			setAreModelsLoading(false)
		}
	}, [])

	return {
		areModelsLoading,
		isModelsError,
	}
}

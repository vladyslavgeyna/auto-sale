import carAdService from '@/services/car-ad.service'
import { IGetFilteringSortingDataOutput } from '@/types/car-ad/get-filtering-sorting-data-output.interface'
import { useEffect, useState } from 'react'

export const useGetCarAdsFilteringSortingData = () => {
	const [isDataLoading, setIsDataLoading] = useState(true)
	const [isDataError, setIsDataError] = useState(false)
	const [data, setData] = useState<IGetFilteringSortingDataOutput>()

	useEffect(() => {
		setIsDataLoading(true)
		carAdService
			.getFilteringSortingData()
			.then(data => {
				setData(data)
			})
			.catch(() => {
				setIsDataError(true)
			})
			.finally(() => {
				setIsDataLoading(false)
				setIsDataError(false)
			})
	}, [])

	return {
		isDataLoading,
		isDataError,
		data,
	}
}

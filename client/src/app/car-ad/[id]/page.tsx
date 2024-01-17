'use client'

import CarAdPage from '@/components/car-ad-page/CarAdPage'
import ComplexError from '@/components/complex-error/ComplexError'
import Loader from '@/components/loader/Loader'
import NotFound from '@/components/not-found/NotFound'
import { useGetCarAdById } from '@/hooks/useGetCarAdById'

type PropsType = {
	params: {
		id: string
	}
}

const CarAdByIdPage = ({ params }: PropsType) => {
	const carAdId = params.id ? Number(params.id) || undefined : undefined

	if (!carAdId) {
		return <NotFound />
	}

	const {
		data: carAd,
		isLoading: isCarAdLoading,
		isSuccess: isGettingCarAdSuccess,
		isError: isGettingCarAdError,
		error: getCarAdError,
	} = useGetCarAdById(carAdId)

	if (isCarAdLoading) {
		return (
			<div className='mt-72'>
				<Loader />
			</div>
		)
	}

	if (!isGettingCarAdSuccess || isGettingCarAdError) {
		return <ComplexError error={getCarAdError} />
	}

	return <CarAdPage carAd={carAd} />
}

export default CarAdByIdPage

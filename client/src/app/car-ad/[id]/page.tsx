'use client'

import CarAdPage from '@/components/car-ad-page/CarAdPage'
import Forbidden from '@/components/forbidden/Forbidden'
import Loader from '@/components/loader/Loader'
import NotFound from '@/components/not-found/NotFound'
import { useGetCarAdById } from '@/hooks/useGetCarAdById'
import { IHttpError } from '@/types/http-error.interface'
import { AxiosError } from 'axios'
import { redirect } from 'next/navigation'

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
		if (getCarAdError) {
			const error = getCarAdError as AxiosError
			const httpError = IHttpError.toIHttpError(error)
			if (!httpError) {
				redirect('/error')
			}
			if (httpError.status === 404) {
				return <NotFound text={httpError.message} />
			} else if (httpError.status === 403) {
				return <Forbidden text={httpError.message} />
			} else {
				redirect('/error')
			}
		} else {
			redirect('/error')
		}
	}

	return <CarAdPage carAd={carAd} />
}

export default CarAdByIdPage

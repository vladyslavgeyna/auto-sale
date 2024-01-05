'use client'

import CarAdsList from '@/components/car-ads-list/CarAdsList'
import Loader from '@/components/loader/Loader'
import { useGetCarAds } from '@/hooks/useGetCarAds'
import { redirect } from 'next/navigation'

export default function Home() {
	const {
		data: carAdsData,
		isLoading: areCarAdsLoading,
		isSuccess: isGettingCarAdsSuccess,
		isError: isGettingCarAdsError,
	} = useGetCarAds()

	if (areCarAdsLoading) {
		return (
			<div className='flex justify-center my-5'>
				<Loader />
			</div>
		)
	}

	if (!isGettingCarAdsSuccess || isGettingCarAdsError) {
		redirect('/error')
	}

	return <CarAdsList carAds={carAdsData.carAds} />
}

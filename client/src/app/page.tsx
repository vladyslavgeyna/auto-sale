'use client'

import CarAdsList from '@/components/car-ads-list/CarAdsList'
import CarAdsListSkeleton from '@/components/car-ads-list/CarAdsListSkeleton'
import Title from '@/components/ui/Title'
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
		return <CarAdsListSkeleton />
	}

	if (!isGettingCarAdsSuccess || isGettingCarAdsError) {
		redirect('/error')
	}

	if (!carAdsData.carAds.length) {
		return (
			<Title className='text-center mt-5'>
				At the moment there are no ads or they were not found
			</Title>
		)
	}

	return <CarAdsList carAds={carAdsData.carAds} />
}

'use client'

import CarAdsList from '@/components/car-ads-list/CarAdsList'
import CarAdsListSkeleton from '@/components/car-ads-list/CarAdsListSkeleton'
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

	return <CarAdsList carAds={carAdsData.carAds} />
}

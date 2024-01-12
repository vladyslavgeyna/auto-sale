'use client'

import AllCarAdsPagination from '@/components/all-car-ads-pagination/AllCarAdsPagination'
import CarAdsList from '@/components/car-ads-list/CarAdsList'
import CarAdsListSkeleton from '@/components/car-ads-list/CarAdsListSkeleton'
import Title from '@/components/ui/Title'
import { useGetCarAds } from '@/hooks/useGetCarAds'
import { useHomePagePaginationData } from '@/hooks/useHomePagePaginationData'
import { redirect } from 'next/navigation'

export default function Home() {
	const { limit, page } = useHomePagePaginationData()

	const {
		data: carAdsData,
		isLoading: areCarAdsLoading,
		isSuccess: isGettingCarAdsSuccess,
		isError: isGettingCarAdsError,
		isFetching: isGettingCarAdsFetching,
	} = useGetCarAds({
		limit,
		page,
	})

	if (areCarAdsLoading || isGettingCarAdsFetching) {
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

	return (
		<>
			<div className='flex items-center gap-3 justify-between'>
				<Title>Car ads</Title>
				<div className='text-xl font-bold'>
					Count of ads were found for your request: {carAdsData.count}
				</div>
			</div>
			<div className='flex flex-col justify-between gap-24 mt-5'>
				<CarAdsList carAds={carAdsData.carAds} />
				<AllCarAdsPagination
					limit={limit}
					page={page}
					totalCount={carAdsData.count}
				/>
			</div>
		</>
	)
}

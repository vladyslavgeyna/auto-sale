'use client'

import AllCarAdsPagination from '@/components/all-car-ads-pagination/AllCarAdsPagination'
import CarAdsList from '@/components/car-ads-list/CarAdsList'
import CarAdsListSkeleton from '@/components/car-ads-list/CarAdsListSkeleton'
import FilteringSortingModal from '@/components/filtering-sorting-modal/FilteringSortingModal'
import FilteringSortingModalSkeleton from '@/components/filtering-sorting-modal/FilteringSortingModalSkeleton'
import { Skeleton } from '@/components/ui/Skeleton'
import Title from '@/components/ui/Title'
import { useGetCarAds } from '@/hooks/useGetCarAds'
import { useGetCarAdsFilteringSortingData } from '@/hooks/useGetCarAdsFilteringSortingData'
import { useSetCarModelsBaseOnSearchParams } from '@/hooks/useGetCarModelsBaseOnSearchParams'
import { useHomePagePaginationData } from '@/hooks/useHomePagePaginationData'
import { IEnum } from '@/types/enum.interface'
import { redirect, useSearchParams } from 'next/navigation'
import { useState } from 'react'

export default function Home() {
	const searchParams = useSearchParams()
	const { data, isDataError, isDataLoading } =
		useGetCarAdsFilteringSortingData()

	const [carModels, setCarModels] = useState<IEnum[]>()

	const { areModelsLoading, isModelsError } =
		useSetCarModelsBaseOnSearchParams(setCarModels)

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
		carBrandId: Number(searchParams.get('carBrandId')) || undefined,
		carModelId: Number(searchParams.get('carModelId')) || undefined,
		region: Number(searchParams.get('region')) || undefined,
		yearFrom: Number(searchParams.get('yearFrom')) || undefined,
		yearTo: Number(searchParams.get('yearTo')) || undefined,
		priceFrom: Number(searchParams.get('priceFrom')) || undefined,
		priceTo: Number(searchParams.get('priceTo')) || undefined,
		orderBy: Number(searchParams.get('orderBy')) || undefined,
	})

	const areCarAdsLoadingOrFetching =
		areCarAdsLoading || isGettingCarAdsFetching

	if (
		!areModelsLoading &&
		!isDataLoading &&
		!areCarAdsLoading &&
		!isGettingCarAdsFetching &&
		(!isGettingCarAdsSuccess ||
			isGettingCarAdsError ||
			isDataError ||
			isModelsError ||
			!carModels ||
			!data)
	) {
		redirect('/error')
	}

	const carAdsLoadedAndExists = carAdsData && carAdsData.carAds.length > 0

	return (
		<>
			<div className='flex sm:flex-row flex-col items-center gap-3 justify-between'>
				{areCarAdsLoadingOrFetching || isDataLoading ? (
					<FilteringSortingModalSkeleton />
				) : (
					carAdsData &&
					data &&
					carModels && (
						<FilteringSortingModal
							setCarModels={setCarModels}
							carModels={carModels}
							data={data}
						/>
					)
				)}
				<div className='text-xl font-bold flex gap-2 items-center'>
					{areCarAdsLoadingOrFetching ? (
						<Skeleton className='w-96 h-7' />
					) : (
						carAdsData && (
							<p className='text-center sm:text-right text-pretty'>
								Count of ads were found for your request:{' '}
								{carAdsData.count}
							</p>
						)
					)}
				</div>
			</div>
			<div className='flex flex-col justify-between gap-24 mt-5'>
				{areCarAdsLoadingOrFetching ? (
					<CarAdsListSkeleton />
				) : carAdsLoadedAndExists ? (
					<CarAdsList carAds={carAdsData.carAds} />
				) : (
					<Title className='text-center mt-5'>
						At the moment there are no ads or they were not found
					</Title>
				)}
				{carAdsLoadedAndExists && (
					<AllCarAdsPagination
						limit={limit}
						page={page}
						totalCount={carAdsData.count}
					/>
				)}
			</div>
		</>
	)
}

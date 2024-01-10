'use client'
import CarComparisonsTable from '@/components/car-comparisons-table/CarComparisonsTable'
import CarComparisonsTableSkeleton from '@/components/car-comparisons-table/CarComparisonsTableSkeleton'
import Title from '@/components/ui/Title'
import RequireAuth from '@/hoc/RequireAuth'
import { useGetCarComparisons } from '@/hooks/useGetCarComparisons'
import { redirect } from 'next/navigation'

const CarComparisons = () => {
	const {
		data: carComparisons,
		isLoading: areCarComparisonsLoading,
		isSuccess: isGettingCarComparisonsSuccess,
		isError: isGettingCarComparisonsError,
	} = useGetCarComparisons()

	if (
		!areCarComparisonsLoading &&
		(!isGettingCarComparisonsSuccess || isGettingCarComparisonsError)
	) {
		redirect('/error')
	}

	const hasDataLoadedAndItExists =
		!areCarComparisonsLoading && carComparisons && carComparisons.length > 0

	return (
		<RequireAuth>
			<div>
				{(areCarComparisonsLoading || hasDataLoadedAndItExists) && (
					<Title className='mb-3'>Comparisons</Title>
				)}
				{areCarComparisonsLoading ? (
					<div>
						<CarComparisonsTableSkeleton />
					</div>
				) : hasDataLoadedAndItExists ? (
					<CarComparisonsTable carComparisons={carComparisons} />
				) : (
					<Title className='text-center'>
						You don't have any ad in comparisons
					</Title>
				)}
			</div>
		</RequireAuth>
	)
}

export default CarComparisons

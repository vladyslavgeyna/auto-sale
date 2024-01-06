import CarAdItemSkeleton from '../car-ad-item/CarAdItemSkeleton'

const CarAdsListSkeleton = () => {
	return (
		<div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4'>
			{Array.from({ length: 8 }).map((_, index) => (
				<CarAdItemSkeleton key={index} />
			))}
		</div>
	)
}

export default CarAdsListSkeleton

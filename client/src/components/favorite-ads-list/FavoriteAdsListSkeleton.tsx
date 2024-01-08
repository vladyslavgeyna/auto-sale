import FavoriteAdItemSkeleton from '../favorite-ad-item/FavoriteAdItemSkeleton'

const FavoriteAdsListSkeleton = () => {
	return (
		<div className='flex flex-col gap-5'>
			{Array.from({ length: 4 }).map((_, index) => (
				<FavoriteAdItemSkeleton key={index} />
			))}
		</div>
	)
}

export default FavoriteAdsListSkeleton

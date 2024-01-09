import MyAdItemSkeleton from '../my-ad-item/MyAdItemSkeleton'

const MyAdsListSkeleton = () => {
	return (
		<div className='flex flex-col gap-5'>
			{Array.from({ length: 4 }).map((_, index) => (
				<MyAdItemSkeleton key={index} />
			))}
		</div>
	)
}

export default MyAdsListSkeleton

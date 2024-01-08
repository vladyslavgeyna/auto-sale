import { Skeleton } from '../ui/Skeleton'

const FavoriteAdItemSkeleton = () => {
	return (
		<div className='h-full mb-3 border rounded p-4'>
			<div className='flex flex-col md:flex-row md:items-center gap-6	'>
				<div className='md:w-[40%] lg:w-1/3'>
					<Skeleton
						style={{ paddingBottom: '50%' }}
						className='overflow-hidden rounded-lg relative'>
						<Skeleton className='object-cover absolute top-0 left-0 h-full w-full hover:scale-[1.03] transition-all duration-300' />
					</Skeleton>
				</div>
				<div className='md:w-[60%] lg:w-4/6 flex gap-2 flex-col justify-between self-stretch'>
					<div className='flex items-center justify-between gap-3'>
						<Skeleton className='h-7 w-36' />
						<Skeleton className='h-11 w-28 rounded-md' />
					</div>
					<div className='flex flex-col gap-2'>
						<Skeleton className='h-5 w-44' />
						<Skeleton className='h-5 w-44' />
						<Skeleton className='h-5 w-44' />
						<Skeleton className='h-5 w-44' />
						<Skeleton className='h-5 w-44' />
					</div>
					<div className='flex-col sm:flex-row flex items-center justify-between gap-2'>
						<div className='flex flex-col items-start gap-1 self-start sm:self-stretch'>
							<Skeleton className='h-4 w-40' />
							<Skeleton className='h-4 w-40' />
							<Skeleton className='h-4 w-40' />
						</div>
						<div className='self-stretch'>
							<Skeleton className='h-[42px] min-w-[229px]' />
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default FavoriteAdItemSkeleton

import { Skeleton } from '../ui/Skeleton'

const MyAdItemSkeleton = () => {
	return (
		<div className='h-full mb-3 border rounded p-4'>
			<div className='flex flex-col lg:flex-row lg:items-center gap-6	'>
				<div className='lg:w-1/3'>
					<Skeleton
						style={{ paddingBottom: '50%' }}
						className='overflow-hidden rounded-lg relative'>
						<Skeleton className='object-cover absolute top-0 left-0 h-full w-full hover:scale-[1.03] transition-all duration-300' />
					</Skeleton>
				</div>
				<div className='lg:w-4/6 flex gap-2 flex-col justify-between self-stretch'>
					<div>
						<Skeleton className='h-7 w-36' />
					</div>
					<div className='flex flex-col gap-2'>
						<Skeleton className='h-5 w-44' />
						<Skeleton className='h-5 w-44' />
						<Skeleton className='h-5 w-44' />
						<Skeleton className='h-5 w-44' />
						<Skeleton className='h-5 w-44' />
					</div>
					<div className='flex-col sm:flex-row flex items-center justify-between gap-2'>
						<div className='text-sm flex flex-col gap-0.5 self-start sm:self-center'>
							<Skeleton className='h-4 w-40' />
						</div>
						<div className='flex flex-col items-stretch w-full sm:w-[initial] sm:flex-row gap-3 sm:items-center'>
							<Skeleton className='h-[42px] min-w-[100px]' />
							<Skeleton className='h-[42px] min-w-[100px]' />
							<Skeleton className='h-[42px] min-w-[100px]' />
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default MyAdItemSkeleton

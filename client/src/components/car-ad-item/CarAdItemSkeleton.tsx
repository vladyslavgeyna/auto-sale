import { Skeleton } from '../ui/Skeleton'

const CarAdItemSkeleton = () => {
	return (
		<div className='border rounded-lg p-3 flex flex-col h-full gap-3'>
			<div className='flex-auto'>
				<div
					style={{ paddingBottom: '60%' }}
					className='rounded-lg relative'>
					<Skeleton className='object-cover absolute top-0 left-0 h-full w-full ' />
				</div>
				<div>
					<Skeleton className='h-7 mt-2' />
					<Skeleton className='h-6 mt-2' />
					<div className='grid grid-cols-2 gap-4 mt-2'>
						<Skeleton className='h-5' />
						<Skeleton className='h-5' />
						<Skeleton className='h-5' />
						<Skeleton className='h-5' />
					</div>
				</div>
			</div>
			<div>
				<Skeleton className='w-full h-10' />
			</div>
		</div>
	)
}

export default CarAdItemSkeleton

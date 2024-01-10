import { Skeleton } from '../ui/Skeleton'

const TableHeadItemSkeleton = () => {
	return (
		<>
			<Skeleton className='font-bold absolute top-0 right-0 py-1 cursor-pointer px-2 text-lg' />
			<Skeleton className='font-bold text-xl mb-3' />
			<div
				style={{ paddingBottom: '60%' }}
				className='overflow-hidden rounded-lg relative'>
				<Skeleton className='object-cover absolute top-0 left-0 h-full w-full ' />
			</div>
		</>
	)
}

export default TableHeadItemSkeleton

import { Skeleton } from '@/components/ui/skeleton'

const ButtonsGroupSkeleton = () => {
	return (
		<>
			<Skeleton className='w-28 h-10 bg-gray-300' />
			<Skeleton className='w-28 h-10 bg-gray-300' />
		</>
	)
}

export default ButtonsGroupSkeleton

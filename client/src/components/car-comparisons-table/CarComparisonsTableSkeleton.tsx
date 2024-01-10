import { Skeleton } from '../ui/Skeleton'
import TableHeadItemSkeleton from './TableHeadItemSkeleton'

const SkeletonTdGroup = () => {
	return (
		<>
			<td>
				<Skeleton className='h-6 w-32' />
			</td>
			<td>
				<Skeleton className='h-6 w-36' />
			</td>
			<td>
				<Skeleton className='h-6 w-44' />
			</td>
			<td>
				<Skeleton className='h-6 w-32' />
			</td>
		</>
	)
}

const CarComparisonsTableSkeleton = () => {
	return (
		<div className='overflow-auto'>
			<table className='[&_td:first-child]:sticky [&_td:first-child]:bg-white [&_td:first-child]:left-[-1px] [&_td:first-child]:z-10 table-fixed border-collapse border [&_td]:border w-full [&_td]:w-72 [&_td:first-child]:w-52 [&_td:first-child]:font-bold [&_td]:p-2'>
				<tbody>
					<tr>
						<td></td>
						{Array.from({ length: 3 }).map((_, index) => (
							<td>
								<TableHeadItemSkeleton />
							</td>
						))}
					</tr>
					{Array.from({ length: 13 }).map((_, index) => (
						<tr key={index}>
							<SkeletonTdGroup />
						</tr>
					))}
				</tbody>
			</table>
		</div>
	)
}

export default CarComparisonsTableSkeleton

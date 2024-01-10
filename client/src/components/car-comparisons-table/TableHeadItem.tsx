import { useToggleCarComparison } from '@/hooks/useToggleCarComparison'
import { ICarComparison } from '@/types/car-comparison/car-comparions.interface'
import { Loader2 } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from '../ui/Tooltip'

const TableHeadItem = ({
	carComparison,
}: {
	carComparison: ICarComparison
}) => {
	const { mutate: toggle, isPending } = useToggleCarComparison(
		carComparison.carAdId,
	)

	const handleOnRemoveCarComparison = () => {
		toggle(carComparison.carAdId)
	}

	return (
		<>
			<TooltipProvider delayDuration={100}>
				<Tooltip>
					<TooltipTrigger asChild>
						<p className='font-bold absolute top-0 right-0 py-1 hover:text-slate-700 cursor-pointer px-2 text-lg'>
							{isPending ? (
								<Loader2 className='animate-spin h-6 w-6' />
							) : (
								<span onClick={handleOnRemoveCarComparison}>
									&#88;
								</span>
							)}
						</p>
					</TooltipTrigger>
					<TooltipContent>
						<span>Remove from comparison</span>
					</TooltipContent>
				</Tooltip>
			</TooltipProvider>
			<h3 className='font-bold text-xl mb-3'>
				<Link
					href={`/car-ad/${carComparison.carAdId}`}
					className='hover:underline'>
					{carComparison.title}
				</Link>
			</h3>
			<div
				style={{ paddingBottom: '60%' }}
				className='overflow-hidden rounded-lg relative'>
				<Link href={`/car-ad/${carComparison.carAdId}`}>
					<Image
						priority={true}
						className='object-cover absolute top-0 left-0 h-full w-full hover:scale-[1.03] transition-all duration-300'
						width={300}
						height={300}
						alt={carComparison.title}
						src={carComparison.image}
					/>
				</Link>
			</div>
		</>
	)
}

export default TableHeadItem

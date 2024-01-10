import { useExistsFavoriteAd } from '@/hooks/useExistsFavoriteAd'
import { useToggleFavoriteAd } from '@/hooks/useToggleFavoriteAd'
import { Loader2 } from 'lucide-react'
import { redirect } from 'next/navigation'
import { FaHeart, FaRegHeart } from 'react-icons/fa'
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from '../ui/Tooltip'

type PropsType = {
	carAdId: number
	className?: string
}

const Heart = ({ carAdId, className = '' }: PropsType) => {
	const {
		data: exists,
		isLoading: isCheckingCarComparisonLoading,
		isSuccess: isCheckingCarComparisonSuccess,
		isError: isCheckingCarComparisonError,
		isFetching: isCheckingCarComparisonFetching,
	} = useExistsFavoriteAd(carAdId)

	const { mutate: toggle, isPending } = useToggleFavoriteAd(carAdId)

	if (
		isCheckingCarComparisonLoading ||
		isPending ||
		isCheckingCarComparisonFetching
	) {
		return <Loader2 className={'animate-spin ' + className} />
	}

	if (!isCheckingCarComparisonSuccess || isCheckingCarComparisonError) {
		redirect('/error')
	}

	const handleToggleToFavorites = async () => {
		toggle(carAdId)
	}

	return (
		<TooltipProvider delayDuration={100}>
			<Tooltip>
				<TooltipTrigger asChild>
					<div>
						{exists ? (
							<FaHeart
								onClick={handleToggleToFavorites}
								className={
									'transition-all duration-200 cursor-pointer text-[#ff0000] active:scale-90 ' +
									className
								}
							/>
						) : (
							<FaRegHeart
								onClick={handleToggleToFavorites}
								className={
									'transition-all duration-200 cursor-pointer text-[#ff0000] active:scale-90 ' +
									className
								}
							/>
						)}
					</div>
				</TooltipTrigger>
				<TooltipContent>
					{exists ? 'Remove from favorites' : 'Add to favorites'}
				</TooltipContent>
			</Tooltip>
		</TooltipProvider>
	)
}

export default Heart

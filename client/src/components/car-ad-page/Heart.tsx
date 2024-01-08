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

const Heart = ({ carAdId }: { carAdId: number }) => {
	const {
		data: exists,
		isLoading: isCheckingCarComparisonLoading,
		isSuccess: isCheckingCarComparisonSuccess,
		isError: isCheckingCarComparisonError,
	} = useExistsFavoriteAd(carAdId)

	const { mutate: toggle, isPending } = useToggleFavoriteAd(carAdId)

	if (isCheckingCarComparisonLoading || isPending) {
		return <Loader2 className='w-10 h-10 animate-spin' />
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
								className='transition-all w-10 h-10 duration-200 cursor-pointer text-[#ff0000] active:scale-90'
							/>
						) : (
							<FaRegHeart
								onClick={handleToggleToFavorites}
								className='transition-all w-10 h-10 duration-200 cursor-pointer text-[#ff0000] active:scale-90'
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

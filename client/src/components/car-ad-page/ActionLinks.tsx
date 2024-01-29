import { useExistsCarComparison } from '@/hooks/useExistsCarComparison'
import { useToggleCarComparison } from '@/hooks/useToggleCarComparison'
import { IGetCarAdByIdOutput } from '@/types/car-ad/get-car-ad-by-id-output.interface'
import { Loader2 } from 'lucide-react'
import { redirect } from 'next/navigation'
import { FaRegComment, FaRegComments } from 'react-icons/fa'
import { FaScaleBalanced } from 'react-icons/fa6'
import { Button } from '../ui/Button'
import ActionLink from './ActionLink'

type PropsType = {
	isNotCurrentUserAd: boolean
	carAd: IGetCarAdByIdOutput
}

const ActionLinks = ({ isNotCurrentUserAd, carAd }: PropsType) => {
	const {
		data: exists,
		isLoading: isCheckingCarComparisonLoading,
		isSuccess: isCheckingCarComparisonSuccess,
		isError: isCheckingCarComparisonError,
		isFetching: isCheckingCarComparisonFetching,
	} = useExistsCarComparison(carAd.id, isNotCurrentUserAd)

	const { mutate: toggle, isPending } = useToggleCarComparison(carAd.id)

	if (
		!isCheckingCarComparisonLoading &&
		((!isCheckingCarComparisonSuccess && isNotCurrentUserAd) ||
			isCheckingCarComparisonError)
	) {
		redirect('/error')
	}

	const handleToggleComparison = async () => {
		toggle(carAd.id)
	}

	return (
		<>
			<ActionLink
				href={`/user-review/${carAd.userId}`}
				text='All reviews'
				icon={<FaRegComments />}
			/>
			{isNotCurrentUserAd && (
				<>
					<ActionLink
						href={`/user-review/create/${carAd.userId}`}
						text='Leave a review'
						icon={<FaRegComment />}
					/>
					<Button
						onClick={handleToggleComparison}
						type='button'
						className='w-full flex gap-2 items-center justify-center mt-3'>
						{isCheckingCarComparisonLoading ||
						isPending ||
						isCheckingCarComparisonFetching ? (
							<Loader2 className='h-6 w-6 animate-spin' />
						) : (
							<>
								<FaScaleBalanced />
								{!exists
									? 'Add car to comparison'
									: 'Remove car from comparison'}
							</>
						)}
					</Button>
				</>
			)}
		</>
	)
}

export default ActionLinks

import { useUserStore } from '@/store/user'
import IGetUserReviewsByUserToIdOutput from '@/types/user-review/get-user-reviews-by-user-to-id-output.interface'
import { useShallow } from 'zustand/react/shallow'
import Loader from '../loader/Loader'
import UserReviewItem from '../user-review-item/UserReviewItem'

const UserReviewsList = ({
	userReviews,
	userToId,
}: {
	userReviews: IGetUserReviewsByUserToIdOutput[]
	userToId: string
}) => {
	const { user, isCheckingAuthFinished, isLoading } = useUserStore(
		useShallow(state => ({
			user: state.user,
			isCheckingAuthFinished: state.isCheckingAuthFinished,
			isLoading: state.isLoading,
		})),
	)

	if (!isCheckingAuthFinished || isLoading) {
		return (
			<div className='mt-72'>
				<Loader />
			</div>
		)
	}

	return (
		<div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
			{userReviews.map(userReview => {
				return (
					<UserReviewItem
						key={userReview.id}
						userReview={userReview}
						currentUserId={user?.id}
						userToId={userToId}
					/>
				)
			})}
		</div>
	)
}

export default UserReviewsList

'use client'

import ComplexError from '@/components/complex-error/ComplexError'
import Loader from '@/components/loader/Loader'
import Title from '@/components/ui/Title'
import UserReviewsList from '@/components/user-reviews-list/UserReviewsList'
import { useGetUserById } from '@/hooks/useGetUserById'
import { useGetUserReviewsByUserToId } from '@/hooks/useGetUserReviewsByUserToId'

type PropsType = {
	params: {
		userToId: string
	}
}

const UserReviewsPage = ({ params }: PropsType) => {
	const userToId = params.userToId

	const { data, isLoading, isSuccess, isError, error } =
		useGetUserById(userToId)

	const {
		data: userReviews,
		isLoading: areUserReviewsLoading,
		isSuccess: isUserReviewsSuccess,
		isError: isUserReviewsError,
		error: userReviewsError,
	} = useGetUserReviewsByUserToId(userToId)

	if (isLoading || areUserReviewsLoading) {
		return (
			<div className='mt-72'>
				<Loader />
			</div>
		)
	}

	if (!isSuccess || isError) {
		return <ComplexError error={error} />
	}

	if (!isUserReviewsSuccess || isUserReviewsError) {
		return <ComplexError error={userReviewsError} />
	}

	return (
		<div>
			{userReviews.length > 0 ? (
				<>
					<Title className='mt-5 mb-5'>
						Reviews about the seller:
						<br />
						{data.name} {data.surname}
					</Title>
					<UserReviewsList
						userToId={userToId}
						userReviews={userReviews}
					/>
				</>
			) : (
				<Title className='text-center'>
					The seller has not got any reviews yet.
				</Title>
			)}
		</div>
	)
}

export default UserReviewsPage

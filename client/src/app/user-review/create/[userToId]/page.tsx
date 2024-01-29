'use client'

import ComplexError from '@/components/complex-error/ComplexError'
import CreateUserReviewForm from '@/components/create-user-review-form/CreateUserReviewForm'
import Loader from '@/components/loader/Loader'
import Title from '@/components/ui/Title'
import RequireAuth from '@/hoc/RequireAuth'
import { useGetUserById } from '@/hooks/useGetUserById'

type PropsType = {
	params: {
		userToId: string
	}
}

const CreateUserReviewPage = ({ params }: PropsType) => {
	const userToId = params.userToId

	const { data, isLoading, isSuccess, isError, error } =
		useGetUserById(userToId)

	if (isLoading) {
		return (
			<div className='mt-72'>
				<Loader />
			</div>
		)
	}

	if (!isSuccess || isError) {
		return <ComplexError error={error} />
	}

	return (
		<RequireAuth>
			<div>
				<Title className='text-center mt-5'>
					Review about the seller:
					<br />
					{data.name} {data.surname}
				</Title>
				<CreateUserReviewForm userTo={data} />
			</div>
		</RequireAuth>
	)
}

export default CreateUserReviewPage

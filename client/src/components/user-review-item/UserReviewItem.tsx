import { useDeleteUserReview } from '@/hooks/useDeleteUserReview'
import IGetUserReviewsByUserToIdOutput from '@/types/user-review/get-user-reviews-by-user-to-id-output.interface'
import { Loader2 } from 'lucide-react'
import { Button } from '../ui/Button'
import UserInfo from './UserInfo'

const UserReviewItem = ({
	userReview,
	currentUserId,
	userToId,
}: {
	userReview: IGetUserReviewsByUserToIdOutput
	currentUserId?: string
	userToId: string
}) => {
	const { mutate: remove, isPending: isDeletePending } = useDeleteUserReview(
		userReview.id,
		userToId,
	)

	const handleDeleteReview = () => {
		remove(userReview.id)
	}

	const isCurrentUser: boolean =
		currentUserId && currentUserId === userReview.userFrom.id ? true : false

	return (
		<div className='col-span-1 overflow-hidden border rounded-lg'>
			<div className='flex flex-col h-full'>
				<div className='flex justify-between gap-2 items-center bg-slate-200 p-2'>
					<UserInfo
						isCurrentUser={isCurrentUser}
						user={userReview.userFrom}
					/>
					<div className='text-sm font-medium text-slate-700'>
						Left at: {userReview.dateOfCreation}
					</div>
				</div>
				<div className='flex-auto p-2 '>
					<h3 className='text-lg font-bold'>{userReview.title}</h3>
					<div className='mt-1 whitespace-pre-wrap break-words'>
						{userReview.text}
					</div>
				</div>
				{isCurrentUser && (
					<div className='p-2 self-start mt-3'>
						<Button className='min-w-[83px]' type='button'>
							{isDeletePending ? (
								<Loader2 className='animate-spin h-6 w-6' />
							) : (
								<span
									onClick={handleDeleteReview}
									className='w-full h-full inline-block'>
									Delete
								</span>
							)}
						</Button>
					</div>
				)}
			</div>
		</div>
	)
}

export default UserReviewItem

import { FindManyOptions, FindOneOptions } from 'typeorm'
import { UserReview } from './user-review.entity'

export const getByUserToIdOptions = (
	userToId: string,
): FindManyOptions<UserReview> => ({
	select: {
		id: true,
		dateOfCreation: true,
		text: true,
		title: true,
		userFrom: {
			id: true,
			email: true,
			name: true,
			surname: true,
			phone: true,
			image: {
				name: true,
			},
			role: true,
		},
	},
	where: { userTo: { id: userToId } },
	relations: {
		userFrom: {
			image: true,
		},
	},
	order: { dateOfCreation: 'DESC' },
})

export const deleteOptions = (
	userReviewId: number,
): FindOneOptions<UserReview> => ({
	where: { id: userReviewId },
	relations: {
		userFrom: true,
	},
	select: {
		userFrom: {
			id: true,
		},
	},
})

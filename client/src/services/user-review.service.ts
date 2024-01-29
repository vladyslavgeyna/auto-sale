import { api, authApi } from '@/http/index'
import ICreateUserReviewInput from '@/types/user-review/create-user-review-input.interface'
import IGetUserReviewsByUserToIdOutput from '@/types/user-review/get-user-reviews-by-user-to-id-output.interface'
import IUserReview from '@/types/user-review/user-review.interface'

class UserReviewService {
	private URI_PREFIX = '/user-reviews'

	create = async (createUserReviewData: ICreateUserReviewInput) => {
		return authApi.post<IUserReview>(`${this.URI_PREFIX}`, {
			...createUserReviewData,
		})
	}

	getByUserToId = async (userToId: string) => {
		return api.get<IGetUserReviewsByUserToIdOutput[]>(
			`${this.URI_PREFIX}/users/${userToId}`,
		)
	}
	delete = async (userReviewId: number) => {
		return authApi.delete(`${this.URI_PREFIX}/${userReviewId}`)
	}
}

export default new UserReviewService()

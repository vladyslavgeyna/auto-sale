import { authApi } from '@/http/index'
import ICreateUserReviewInput from '@/types/user-review/create-user-review-input.interface'
import IUserReview from '@/types/user-review/user-review.interface'

class UserReviewService {
	private URI_PREFIX = '/user-reviews'

	create = async (createUserReviewData: ICreateUserReviewInput) => {
		return authApi.post<IUserReview>(`${this.URI_PREFIX}`, {
			...createUserReviewData,
		})
	}
}

export default new UserReviewService()

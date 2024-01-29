import { api } from '@/http/index'
import { IUser } from '@/types/user/user.interface'

class UserReviewService {
	private URI_PREFIX = '/users'

	getById = async (userId: string) => {
		return api.get<IUser>(`${this.URI_PREFIX}/${userId}`)
	}
}

export default new UserReviewService()

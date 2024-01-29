import { Repository } from 'typeorm'
import { appDataSource } from '../../data-source'
import { getFormattedDate } from '../../utils/date.utils'
import CreateUserReviewInputDto from './dtos/create-user-review-input.dto'
import {
	default as CreateUserReviewOutputDto,
	default as UserReviewDto,
} from './dtos/user-review.dto'
import { UserReview } from './user-review.entity'

class UserReviewService {
	private userReviewRepository: Repository<UserReview>

	constructor() {
		this.userReviewRepository = appDataSource.getRepository(UserReview)
	}

	async create(
		userReview: CreateUserReviewInputDto,
	): Promise<CreateUserReviewOutputDto> {
		const newUserReview = this.userReviewRepository.create({
			dateOfCreation: new Date(),
			text: userReview.text,
			title: userReview.title,
			userTo: { id: userReview.userToId },
			userFrom: { id: userReview.userFromId },
		})

		const createdUserReview = await this.userReviewRepository.save(
			newUserReview,
		)

		const createdUserReviewDto: UserReviewDto = {
			dateOfCreation: getFormattedDate(createdUserReview.dateOfCreation),
			text: createdUserReview.text,
			title: createdUserReview.title,
			userToId: createdUserReview.userTo.id,
			userFromId: createdUserReview.userFrom.id,
			id: createdUserReview.id,
		}

		return createdUserReviewDto
	}
}

export default new UserReviewService()

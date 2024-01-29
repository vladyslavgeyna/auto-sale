import { Repository } from 'typeorm'
import { appDataSource } from '../../data-source'
import { getFormattedDate } from '../../utils/date.utils'
import awsService from '../aws/aws.service'
import CreateUserReviewInputDto from './dtos/create-user-review-input.dto'
import GetUserReviewsByUserToIdOutputDto from './dtos/get-user-reviews-by-user-to-id-output.dto'
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

	async getByUserToId(
		userToId: string,
	): Promise<GetUserReviewsByUserToIdOutputDto[]> {
		const userReviewsData = await this.userReviewRepository.find({
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

		const userReviews: GetUserReviewsByUserToIdOutputDto[] =
			await Promise.all(
				userReviewsData.map(async userReview => {
					let imageLink: string | null = null
					if (userReview.userFrom.image) {
						imageLink = await awsService.getImageUrl(
							userReview.userFrom.image.name,
						)
					}

					return {
						dateOfCreation: getFormattedDate(
							userReview.dateOfCreation,
						),
						userFrom: {
							id: userReview.userFrom.id,
							email: userReview.userFrom.email,
							name: userReview.userFrom.name,
							surname: userReview.userFrom.surname,
							phone: userReview.userFrom.phone,
							imageLink,
							role: userReview.userFrom.role,
						},
						text: userReview.text,
						title: userReview.title,
						id: userReview.id,
					}
				}),
			)

		return userReviews
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

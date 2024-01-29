import { NextFunction, Response } from 'express'
import HttpError from '../../utils/exceptions/http.error'
import { RequestWithBody } from '../../utils/types/request.type'
import CreateUserReviewInputDto from './dtos/create-user-review-input.dto'
import userReviewService from './user-review.service'

class UserReviewController {
	async create(
		req: RequestWithBody<CreateUserReviewInputDto>,
		res: Response,
		next: NextFunction,
	) {
		try {
			if (!req.authUser) {
				return next(HttpError.UnauthorizedError())
			}

			if (req.authUser.id !== req.body.userFromId) {
				return next(
					HttpError.BadRequest(
						'You can only create a review from yourself',
					),
				)
			}

			if (req.authUser.id === req.body.userToId) {
				return next(
					HttpError.BadRequest(
						'You can not create a review about yourself',
					),
				)
			}

			const createdUserReview = await userReviewService.create(req.body)
			res.json(createdUserReview)
		} catch (error) {
			next(error)
		}
	}
}

export default new UserReviewController()

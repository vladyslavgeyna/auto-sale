import { NextFunction, Response } from 'express'
import HttpStatusCode from '../../utils/enums/http-status-code'
import HttpError from '../../utils/exceptions/http.error'
import { RequestWithBody } from '../../utils/types/request.type'
import { RequestWithParams } from './../../utils/types/request.type'
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

	async getByUserToId(
		req: RequestWithParams<{ userToId: string }>,
		res: Response,
		next: NextFunction,
	) {
		try {
			const userReviews = await userReviewService.getByUserToId(
				req.params.userToId,
			)

			res.json(userReviews)
		} catch (error) {
			next(error)
		}
	}

	async delete(
		req: RequestWithParams<{ id: string }>,
		res: Response,
		next: NextFunction,
	) {
		try {
			const useReviewId = req.params.id
				? Number(req.params.id) || undefined
				: undefined

			if (!useReviewId) {
				return next(HttpError.BadRequest(`Invalid user review`))
			}

			if (!req.authUser) {
				return next(HttpError.UnauthorizedError())
			}

			await userReviewService.delete(useReviewId, req.authUser.id)

			res.sendStatus(HttpStatusCode.NO_CONTENT_204)
		} catch (error) {
			next(error)
		}
	}
}

export default new UserReviewController()

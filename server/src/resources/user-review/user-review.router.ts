import { Router } from 'express'
import checkValidationMiddleware from '../../middlewares/check-validation.middleware'
import requireAuthMiddleware from '../../middlewares/require-auth.middleware'
import userReviewController from './user-review.controller'
import { createUserReviewValidation } from './validation/create-user-review.validation'

const userReviewRouter = Router()

userReviewRouter.post(
	'/',
	requireAuthMiddleware,
	createUserReviewValidation,
	checkValidationMiddleware,
	userReviewController.create,
)

userReviewRouter.get('/users/:userToId', userReviewController.getByUserToId)

userReviewRouter.delete(
	'/:id',
	requireAuthMiddleware,
	userReviewController.delete,
)

export default userReviewRouter

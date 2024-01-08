import { Router } from 'express'
import checkValidationMiddleware from '../../middlewares/check-validation.middleware'
import requireAuthMiddleware from '../../middlewares/require-auth.middleware'
import favoriteAdController from './favorite-ad.controller'
import { toggleFavoriteAdValidation } from './validation/toggle-favorite-ad.validation'

const favoriteAdRouter = Router()

favoriteAdRouter.get(
	'/count/car-ads/:carAdId',
	favoriteAdController.getCountByCarAdId,
)

favoriteAdRouter.get(
	'/exists/car-ads/:carAdId',
	requireAuthMiddleware,
	favoriteAdController.exists,
)

favoriteAdRouter.post(
	'/toggle',
	requireAuthMiddleware,
	toggleFavoriteAdValidation,
	checkValidationMiddleware,
	favoriteAdController.toggle,
)

export default favoriteAdRouter

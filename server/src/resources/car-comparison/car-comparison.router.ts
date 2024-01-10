import { Router } from 'express'
import checkValidationMiddleware from '../../middlewares/check-validation.middleware'
import requireAuthMiddleware from '../../middlewares/require-auth.middleware'
import carComparisonController from './car-comparison.controller'
import { toggleCarComparisonValidation } from './validation/toggle-car-comparison.validation'

const carComparisonRouter = Router()

carComparisonRouter.post(
	'/toggle',
	requireAuthMiddleware,
	toggleCarComparisonValidation,
	checkValidationMiddleware,
	carComparisonController.toggle,
)

carComparisonRouter.get(
	'/exists/car-ads/:carAdId',
	requireAuthMiddleware,
	carComparisonController.exists,
)

carComparisonRouter.get(
	'/',
	requireAuthMiddleware,
	carComparisonController.getAll,
)

export default carComparisonRouter

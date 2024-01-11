import { Router } from 'express'
import adminMiddleware from '../../middlewares/admin.middleware'
import checkValidationMiddleware from '../../middlewares/check-validation.middleware'
import requireAuthMiddleware from '../../middlewares/require-auth.middleware'
import { getAllCache } from './cache/get-all.cache'
import carModelController from './car-model.controller'
import { createCarModelValidation } from './validation/create-car-model.validation'

const carModelRouter = Router()

carModelRouter.get('/', getAllCache, carModelController.getAll)

carModelRouter.post(
	'/',
	requireAuthMiddleware,
	adminMiddleware,
	createCarModelValidation,
	checkValidationMiddleware,
	carModelController.create,
)

export default carModelRouter

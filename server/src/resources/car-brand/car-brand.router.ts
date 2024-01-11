import { Router } from 'express'
import adminMiddleware from '../../middlewares/admin.middleware'
import checkValidationMiddleware from '../../middlewares/check-validation.middleware'
import requireAuthMiddleware from '../../middlewares/require-auth.middleware'
import carBrandController from './car-brand.controller'
import { createCarBrandValidation } from './validation/create-car-brand.validation'

const carBrandRouter = Router()

carBrandRouter.get('/', carBrandController.getAll)

carBrandRouter.post(
	'/',
	requireAuthMiddleware,
	adminMiddleware,
	createCarBrandValidation,
	checkValidationMiddleware,
	carBrandController.create,
)

export default carBrandRouter

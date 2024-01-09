import { Router } from 'express'
import authMiddleware from '../../middlewares/auth.middleware'
import checkValidationMiddleware from '../../middlewares/check-validation.middleware'
import { imageUploadMiddleware } from '../../middlewares/image-upload.middleware'
import requireAuthMiddleware from '../../middlewares/require-auth.middleware'
import { imagesExtensionValidation } from '../image/validation/images-extension.validation'
import { imagesSizeValidation } from '../image/validation/images-size.validation'
import { imagesCountValidation } from '../image/validation/images.count.validation'
import { getAllCache } from './cache/get-all.cache'
import { getByIdCache } from './cache/get-by-id.cache'
import carAdController from './car-ad.controller'
import { createCarAdValidation } from './validation/create-car-ad.validation'

const carAdRouter = Router()

carAdRouter.post(
	'/',
	requireAuthMiddleware,
	imageUploadMiddleware.array('images'),
	imagesExtensionValidation,
	imagesSizeValidation(5),
	imagesCountValidation(3),
	createCarAdValidation,
	checkValidationMiddleware,
	carAdController.create,
)

carAdRouter.get('/', getAllCache, carAdController.getAll)

carAdRouter.get(
	'/users/:userId',
	authMiddleware,
	carAdController.getAllUserCarAds,
)

carAdRouter.get('/:id', getByIdCache, authMiddleware, carAdController.getById)

export default carAdRouter

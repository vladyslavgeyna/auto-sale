import { Router } from 'express'
import checkValidationMiddleware from '../../middlewares/check-validation.middleware'
import { imageUploadMiddleware } from '../../middlewares/image-upload.middleware'
import requireAuthMiddleware from '../../middlewares/require-auth.middleware'
import { imagesExtensionValidation } from '../image/validation/images-extension.validation'
import { imagesSizeValidation } from '../image/validation/images-size.validation'
import { imagesCountValidation } from '../image/validation/images.count.validation'
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

export default carAdRouter

import { Router } from 'express'
import checkValidationMiddleware from '../../middlewares/check-validation.middleware'
import { imageUploadMiddleware } from '../../middlewares/image-upload.middleware'
import { imageExtensionValidation } from '../image/validation/image-extension.validation'
import { imageSizeValidation } from '../image/validation/image-size.validation'
import accountController from './account.controller'
import { accountRegisterValidation } from './validation/account-register.validation'

const accountRouter = Router()

accountRouter.post(
	'/register',
	imageUploadMiddleware.single('image'),
	imageSizeValidation(5, false),
	imageExtensionValidation(false),
	accountRegisterValidation,
	checkValidationMiddleware,
	accountController.register,
)

accountRouter.get('/verify/:userId', accountController.verify)

export default accountRouter

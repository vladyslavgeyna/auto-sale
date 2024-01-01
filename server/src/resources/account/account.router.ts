import { Router } from 'express'
import passport from 'passport'
import checkValidationMiddleware from '../../middlewares/check-validation.middleware'
import { imageUploadMiddleware } from '../../middlewares/image-upload.middleware'
import HttpStatusCode from '../../utils/enums/http-status-code'
import { imageExtensionValidation } from '../image/validation/image-extension.validation'
import { imageSizeValidation } from '../image/validation/image-size.validation'
import accountController from './account.controller'
import './passport'
import { accountLoginValidation } from './validation/account-login.validation'
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

accountRouter.post(
	'/login',
	accountLoginValidation,
	checkValidationMiddleware,
	accountController.login,
)

accountRouter.post('/logout', accountController.logout)

accountRouter.get('/verify/:userId', accountController.verify)

accountRouter.get('/refresh', accountController.refresh)

accountRouter.get(
	'/google-login',
	passport.authenticate('google', {
		scope: ['profile', 'email'],
	}),
)

accountRouter.get(
	'/google/callback',
	passport.authenticate('google', {
		successRedirect: '/api/account/google-login/success',
		failureRedirect: '/api/account/google-login/failed',
	}),
)

accountRouter.get('/google-login/failed', (_req, res) => {
	return res
		.status(HttpStatusCode.BAD_REQUEST_400)
		.json({ message: 'Google login failed', errors: [] })
})

accountRouter.get('/google-login/success', accountController.googleLogin)

export default accountRouter

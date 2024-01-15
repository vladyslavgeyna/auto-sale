import { Router } from 'express'
import passport from 'passport'
import checkValidationMiddleware from '../../middlewares/check-validation.middleware'
import { imageUploadMiddleware } from '../../middlewares/image-upload.middleware'
import requireAuthMiddleware from '../../middlewares/require-auth.middleware'
import HttpStatusCode from '../../utils/enums/http-status-code'
import { imageExtensionValidation } from '../image/validation/image-extension.validation'
import { imageSizeValidation } from '../image/validation/image-size.validation'
import accountController from './account.controller'
import './passport'
import { accountChangePasswordValidation } from './validation/account-change-password.validation'
import { accountEditValidation } from './validation/account-edit.validation'
import { accountLoginValidation } from './validation/account-login.validation'
import { accountRegisterValidation } from './validation/account-register.validation'
import { accountResetPasswordValidation } from './validation/account-reset-password.validation'
import { accountSendResetPasswordEmailValidation } from './validation/account-send-reset-password-email.validation'

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

accountRouter.put(
	'/change-password',
	requireAuthMiddleware,
	accountChangePasswordValidation,
	checkValidationMiddleware,
	accountController.changePassword,
)

accountRouter.post(
	'/reset-password',
	accountSendResetPasswordEmailValidation,
	checkValidationMiddleware,
	accountController.sendResetPasswordEmail,
)

accountRouter.put(
	'/reset-password',
	accountResetPasswordValidation,
	checkValidationMiddleware,
	accountController.resetPassword,
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

accountRouter.put(
	'/user',
	requireAuthMiddleware,
	imageUploadMiddleware.single('image'),
	imageSizeValidation(5, false),
	imageExtensionValidation(false),
	accountEditValidation,
	checkValidationMiddleware,
	accountController.edit,
)

// Google login routes
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

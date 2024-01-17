import { body } from 'express-validator'

export const accountSendResetPasswordEmailValidation = [
	body('email')
		.trim()
		.notEmpty()
		.isEmail()
		.withMessage('Not a valid e-mail address'),
]

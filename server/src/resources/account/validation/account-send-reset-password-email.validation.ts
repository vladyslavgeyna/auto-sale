import { body } from 'express-validator'

export const accountSendResetPasswordEmailValidation = [
	body('email')
		.trim()
		.notEmpty()
		.escape()
		.isEmail()
		.withMessage('Not a valid e-mail address'),
]

import { body } from 'express-validator'

export const accountLoginValidation = [
	body('email')
		.trim()
		.notEmpty()
		.isEmail()
		.withMessage('Not a valid e-mail address'),
	body('password').trim().notEmpty().withMessage('Password is required'),
]

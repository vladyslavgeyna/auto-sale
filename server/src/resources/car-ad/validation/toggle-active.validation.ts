import { body } from 'express-validator'

export const toggleActiveValidation = [
	body('carAdId')
		.trim()
		.notEmpty()
		.escape()
		.isInt()
		.withMessage('Invalid car ad'),
]

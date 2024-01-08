import { body } from 'express-validator'

export const toggleCarComparisonValidation = [
	body('carAdId')
		.trim()
		.notEmpty()
		.escape()
		.isInt()
		.withMessage('Invalid car ad'),
]

import { body } from 'express-validator'

export const toggleFavoriteAdValidation = [
	body('carAdId')
		.trim()
		.notEmpty()
		.escape()
		.isInt()
		.withMessage('Invalid car ad'),
]

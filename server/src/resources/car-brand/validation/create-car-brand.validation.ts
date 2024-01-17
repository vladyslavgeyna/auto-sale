import { body } from 'express-validator'

export const createCarBrandValidation = [
	body('name')
		.trim()
		.notEmpty()
		.isLength({ min: 2, max: 100 })
		.withMessage(
			'Car brand name length should be from 2 to 100 characters',
		),
]

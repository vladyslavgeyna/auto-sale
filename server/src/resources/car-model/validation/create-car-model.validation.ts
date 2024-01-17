import { body } from 'express-validator'

export const createCarModelValidation = [
	body('name')
		.trim()
		.notEmpty()
		.isLength({ min: 2, max: 150 })
		.withMessage(
			'Car model name length should be from 2 to 150 characters',
		),
	body('carBrandId')
		.trim()
		.notEmpty()
		.isInt()
		.withMessage('Invalid car brand'),
]

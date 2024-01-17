import { body } from 'express-validator'

export const toggleCarComparisonValidation = [
	body('carAdId').trim().notEmpty().isInt().withMessage('Invalid car ad'),
]

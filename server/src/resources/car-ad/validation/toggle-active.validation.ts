import { body } from 'express-validator'

export const toggleActiveValidation = [
	body('carAdId').trim().notEmpty().isInt().withMessage('Invalid car ad'),
]

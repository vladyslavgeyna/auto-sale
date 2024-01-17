import { body } from 'express-validator'

export const toggleFavoriteAdValidation = [
	body('carAdId').trim().notEmpty().isInt().withMessage('Invalid car ad'),
]

import { body } from 'express-validator'

export const createUserReviewValidation = [
	body('title')
		.trim()
		.notEmpty()
		.isLength({ min: 3, max: 50 })
		.withMessage('Title length should be from 3 to 50 characters'),
	body('text')
		.trim()
		.notEmpty()
		.isLength({ min: 10, max: 300 })
		.withMessage(`Text length should be from 10 to 300 characters`),
	body('userFromId')
		.trim()
		.notEmpty()
		.withMessage(`Invalid 'user from' data`),
	body('userToId').trim().notEmpty().withMessage(`Invalid 'user to' data`),
]

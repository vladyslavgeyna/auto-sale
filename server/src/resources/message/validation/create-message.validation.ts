import { body } from 'express-validator'

export const createMessageValidation = [
	body('senderId')
		.trim()
		.notEmpty()
		.escape()
		.withMessage('Sender is required'),
	body('conversationId')
		.trim()
		.notEmpty()
		.escape()
		.withMessage('Conversation is required'),
	body('text')
		.trim()
		.notEmpty()
		.escape()
		.isLength({ min: 1, max: 5000 })
		.withMessage(`Text length should be from 1 to 5000 characters`),
]

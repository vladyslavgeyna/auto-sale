import { body } from 'express-validator'

export const createConversationValidation = [
	body('senderId')
		.trim()
		.notEmpty()
		.escape()
		.withMessage('Sender is required'),
	body('receiverId')
		.trim()
		.notEmpty()
		.escape()
		.withMessage('Receiver is required'),
]

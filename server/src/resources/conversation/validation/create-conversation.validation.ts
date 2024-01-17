import { body } from 'express-validator'

export const createConversationValidation = [
	body('senderId').trim().notEmpty().withMessage('Sender is required'),
	body('receiverId').trim().notEmpty().withMessage('Receiver is required'),
]

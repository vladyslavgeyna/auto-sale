import { Router } from 'express'
import checkValidationMiddleware from '../../middlewares/check-validation.middleware'
import requireAuthMiddleware from '../../middlewares/require-auth.middleware'
import messageController from './message.controller'
import { createMessageValidation } from './validation/create-message.validation'

const messageRouter = Router()

messageRouter.post(
	'/',
	requireAuthMiddleware,
	createMessageValidation,
	checkValidationMiddleware,
	messageController.create,
)

messageRouter.get(
	'/conversations/:conversationId',
	requireAuthMiddleware,
	messageController.getByConversationId,
)

export default messageRouter

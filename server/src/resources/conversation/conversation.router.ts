import { Router } from 'express'
import checkValidationMiddleware from '../../middlewares/check-validation.middleware'
import requireAuthMiddleware from '../../middlewares/require-auth.middleware'
import conversationController from './conversation.controller'
import { createConversationValidation } from './validation/create-conversation.validation'

const conversationRouter = Router()

conversationRouter.post(
	'/',
	requireAuthMiddleware,
	createConversationValidation,
	checkValidationMiddleware,
	conversationController.create,
)

conversationRouter.get(
	'/users/:userId',
	requireAuthMiddleware,
	conversationController.getByUserId,
)

conversationRouter.get(
	'/:id',
	requireAuthMiddleware,
	conversationController.getById,
)

export default conversationRouter

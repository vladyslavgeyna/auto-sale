import { NextFunction, Response } from 'express'
import HttpStatusCode from '../../utils/enums/http-status-code'
import HttpError from '../../utils/exceptions/http.error'
import {
	RequestWithBody,
	RequestWithParams,
} from '../../utils/types/request.type'
import conversationService from './conversation.service'
import CreateConversationInputDto from './dtos/create-conversation-input.dto'

class ConversationController {
	async create(
		req: RequestWithBody<CreateConversationInputDto>,
		res: Response,
		next: NextFunction,
	) {
		try {
			if (!req.authUser) {
				return next(HttpError.UnauthorizedError())
			}

			if (
				req.authUser.id !== req.body.senderId &&
				req.authUser.id !== req.body.receiverId
			) {
				return next(
					HttpError.Forbidden(
						'You can only create a conversation with yourself',
					),
				)
			}

			const conversation = await conversationService.create(req.body)

			res.json(conversation)
		} catch (error) {
			next(error)
		}
	}

	async updateLastVisit(
		req: RequestWithParams<{ id: string }>,
		res: Response,
		next: NextFunction,
	) {
		try {
			if (!req.authUser) {
				return next(HttpError.UnauthorizedError())
			}

			const conversation = await conversationService.updateLastVisit(
				req.params.id,
				req.authUser.id,
			)

			res.json(conversation)
		} catch (error) {
			next(error)
		}
	}

	async getByUserId(
		req: RequestWithParams<{ userId: string }>,
		res: Response,
		next: NextFunction,
	) {
		try {
			if (!req.authUser) {
				return next(HttpError.UnauthorizedError())
			}

			if (req.authUser.id !== req.params.userId) {
				return next(
					HttpError.Forbidden(
						'You can only get conversations with yourself',
					),
				)
			}

			const conversations = await conversationService.getByUserId(
				req.params.userId,
			)

			res.json(conversations)
		} catch (error) {
			next(error)
		}
	}

	async getById(
		req: RequestWithParams<{ id: string }>,
		res: Response,
		next: NextFunction,
	) {
		try {
			if (!req.authUser) {
				return next(HttpError.UnauthorizedError())
			}

			const conversation = await conversationService.getById(
				req.params.id,
				req.authUser.id,
			)

			res.json(conversation)
		} catch (error) {
			next(error)
		}
	}

	async delete(
		req: RequestWithParams<{ id: string }>,
		res: Response,
		next: NextFunction,
	) {
		try {
			if (!req.authUser) {
				return next(HttpError.UnauthorizedError())
			}

			await conversationService.delete(req.params.id, req.authUser.id)

			res.send(HttpStatusCode.NO_CONTENT_204)
		} catch (error) {
			next(error)
		}
	}
}

export default new ConversationController()

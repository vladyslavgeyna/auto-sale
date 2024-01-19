import { NextFunction, Response } from 'express'
import HttpError from '../../utils/exceptions/http.error'
import {
	RequestWithBody,
	RequestWithParamsAndQuery,
} from '../../utils/types/request.type'
import CreateMessageInputDto from './dtos/create-message-input.dto'
import messageService from './message.service'

class MessageController {
	async create(
		req: RequestWithBody<CreateMessageInputDto>,
		res: Response,
		next: NextFunction,
	) {
		try {
			if (!req.authUser) {
				return next(HttpError.UnauthorizedError())
			}

			if (req.authUser.id !== req.body.senderId) {
				return next(
					HttpError.Forbidden(
						'You can only create a message with yourself',
					),
				)
			}

			const message = await messageService.create(req.body)

			res.json(message)
		} catch (error) {
			next(error)
		}
	}

	async getByConversationId(
		req: RequestWithParamsAndQuery<
			{
				conversationId: string
			},
			{ limit: string; page: string }
		>,
		res: Response,
		next: NextFunction,
	) {
		try {
			if (!req.authUser) {
				return next(HttpError.UnauthorizedError())
			}

			const messages = await messageService.getByConversationId(
				req.params.conversationId,
				req.authUser.id,
				req.query.page,
				req.query.limit,
			)

			res.json(messages)
		} catch (error) {
			next(error)
		}
	}
}

export default new MessageController()

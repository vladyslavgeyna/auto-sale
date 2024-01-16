import { Repository } from 'typeorm'
import { appDataSource } from '../../data-source'
import HttpError from '../../utils/exceptions/http.error'
import conversationService from '../conversation/conversation.service'
import userService from '../user/user.service'
import CreateMessageInputDto from './dtos/create-message-input.dto'
import GetAllConversationMessagesOutputDto from './dtos/get-all-conversation-messages-output.dto'
import MessageDto from './dtos/message.dto'
import { Message } from './message.entity'

class MessageService {
	private messageRepository: Repository<Message>

	constructor() {
		this.messageRepository = appDataSource.getRepository(Message)
	}

	async create(
		createMessageData: CreateMessageInputDto,
	): Promise<MessageDto> {
		const senderExists = await userService.exists(
			createMessageData.senderId,
		)

		if (!senderExists) {
			throw HttpError.NotFound('Sender user does not exist')
		}

		const conversationExists = await conversationService.exists(
			createMessageData.conversationId,
		)

		if (!conversationExists) {
			throw HttpError.NotFound('Conversation does not exist')
		}

		const message = this.messageRepository.create({
			text: createMessageData.text,
			sender: { id: createMessageData.senderId },
			conversation: { id: createMessageData.conversationId },
			dateOfCreation: new Date(),
		})

		const createdMessage = await this.messageRepository.save(message)

		return {
			id: createdMessage.id,
			senderId: createdMessage.sender.id,
			conversationId: createdMessage.conversation.id,
			text: createdMessage.text,
			dateOfCreation: createdMessage.dateOfCreation.toISOString(),
		}
	}

	async getByConversationId(
		conversationId: string,
		currentUserId: string,
	): Promise<GetAllConversationMessagesOutputDto[]> {
		const conversationExists = await conversationService.exists(
			conversationId,
		)

		if (!conversationExists) {
			throw HttpError.NotFound('Conversation does not exist')
		}

		const messages = await this.messageRepository.find({
			relations: {
				sender: true,
				conversation: {
					firstMember: true,
					secondMember: true,
				},
			},
			where: {
				conversation: { id: conversationId },
			},
			select: {
				id: true,
				text: true,
				sender: {
					id: true,
				},
				dateOfCreation: true,
				conversation: {
					id: true,
					firstMember: {
						id: true,
					},
					secondMember: {
						id: true,
					},
				},
			},
		})

		if (
			messages.some(
				m =>
					m.conversation.firstMember.id !== currentUserId &&
					m.conversation.secondMember.id !== currentUserId,
			)
		) {
			throw HttpError.Forbidden(
				'You can only get messages from conversations with yourself',
			)
		}

		const resultMessages = messages.map(m => ({
			id: m.id,
			text: m.text,
			senderId: m.sender.id,
			dateOfCreation: m.dateOfCreation.toISOString(),
			conversationId: m.conversation.id,
			firstMemberId: m.conversation.firstMember.id,
			secondMemberId: m.conversation.secondMember.id,
		}))

		return resultMessages
	}
}

export default new MessageService()

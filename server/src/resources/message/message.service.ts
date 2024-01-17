import { Repository } from 'typeorm'
import { appDataSource } from '../../data-source'
import HttpError from '../../utils/exceptions/http.error'
import awsService from '../aws/aws.service'
import conversationService from '../conversation/conversation.service'
import userService from '../user/user.service'
import CreateMessageInputDto from './dtos/create-message-input.dto'
import GetAllConversationMessagesOutputDto from './dtos/get-all-conversation-messages-output.dto'
import MessageDto from './dtos/message.dto'
import { Message } from './message.entity'
import { getAllConversationMessagesOptions } from './message.utils'

class MessageService {
	private messageRepository: Repository<Message>

	constructor() {
		this.messageRepository = appDataSource.getRepository(Message)
	}

	async create(
		createMessageData: CreateMessageInputDto,
	): Promise<MessageDto> {
		console.log('createMessageData', createMessageData)

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

	async getLastConversationMessageData(conversationId: string) {
		const conversationExists = await conversationService.exists(
			conversationId,
		)

		if (!conversationExists) {
			throw HttpError.NotFound('Conversation does not exist')
		}

		const message = await this.messageRepository.findOne({
			relations: {
				sender: true,
			},
			where: { conversation: { id: conversationId } },
			select: {
				id: true,
				dateOfCreation: true,
				sender: {
					id: true,
				},
			},
			order: { dateOfCreation: 'DESC' },
		})

		if (!message) {
			return null
		}

		return {
			dateOfCreation: message.dateOfCreation.toISOString(),
			senderId: message.sender.id,
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

		const messages = await this.messageRepository.find(
			getAllConversationMessagesOptions(conversationId),
		)

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

		let firstMemberImageLink: string | null = null

		let secondMemberImageLink: string | null = null

		if (messages.length > 0) {
			if (messages[0].conversation.firstMember.image) {
				firstMemberImageLink = await awsService.getImageUrl(
					messages[0].conversation.firstMember.image.name,
				)
			}

			if (messages[0].conversation.secondMember.image) {
				secondMemberImageLink = await awsService.getImageUrl(
					messages[0].conversation.secondMember.image.name,
				)
			}
		}

		const resultMessages = messages.map(m => {
			return {
				id: m.id,
				text: m.text,
				senderId: m.sender.id,
				dateOfCreation: m.dateOfCreation.toISOString(),
				conversationId: m.conversation.id,
				firstMember: {
					id: m.conversation.firstMember.id,
					name: m.conversation.firstMember.name,
					surname: m.conversation.firstMember.surname,
					imageLink: firstMemberImageLink,
				},
				secondMember: {
					id: m.conversation.secondMember.id,
					name: m.conversation.secondMember.name,
					surname: m.conversation.secondMember.surname,
					imageLink: secondMemberImageLink,
				},
			}
		})

		return resultMessages
	}

	async deleteByConversationId(conversationId: string) {
		await this.messageRepository.delete({
			conversation: { id: conversationId },
		})
	}
}

export default new MessageService()

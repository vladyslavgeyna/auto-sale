import { Repository } from 'typeorm'
import HttpError from '../../utils/exceptions/http.error'
import userService from '../user/user.service'
import { appDataSource } from './../../data-source'
import { Conversation } from './conversation.entity'
import ConversationDto from './dtos/conversation.dto'
import CreateConversationInputDto from './dtos/create-conversation-input.dto'

class ConversationService {
	private conversationRepository: Repository<Conversation>

	constructor() {
		this.conversationRepository = appDataSource.getRepository(Conversation)
	}

	async existsByUsers(senderId: string, receiverId: string) {
		const exists = await this.conversationRepository.exist({
			where: [
				{
					firstMember: { id: senderId },
					secondMember: { id: receiverId },
				},
				{
					firstMember: { id: receiverId },
					secondMember: { id: senderId },
				},
			],
		})

		return exists
	}

	async exists(id: string) {
		const exists = await this.conversationRepository.exist({
			where: {
				id,
			},
		})

		return exists
	}

	async create(
		createConversationData: CreateConversationInputDto,
	): Promise<ConversationDto> {
		const senderExists = await userService.exists(
			createConversationData.senderId,
		)

		if (!senderExists) {
			throw HttpError.NotFound('Sender user does not exist')
		}

		const receiverExists = await userService.exists(
			createConversationData.receiverId,
		)

		if (!receiverExists) {
			throw HttpError.NotFound('Receiver user does not exist')
		}

		const exists = await this.existsByUsers(
			createConversationData.senderId,
			createConversationData.receiverId,
		)

		if (exists) {
			throw HttpError.BadRequest('Conversation already exists')
		}

		const conversation = this.conversationRepository.create({
			firstMember: { id: createConversationData.senderId },
			secondMember: { id: createConversationData.receiverId },
		})

		const createdConversation = await this.conversationRepository.save(
			conversation,
		)

		return {
			id: createdConversation.id,
			firstMemberId: createdConversation.firstMember.id,
			secondMemberId: createdConversation.secondMember.id,
		}
	}

	async getByUserId(userId: string): Promise<ConversationDto[]> {
		const userExists = await userService.exists(userId)

		if (!userExists) {
			throw HttpError.NotFound('User was not found')
		}

		const conversations = await this.conversationRepository.find({
			relations: {
				firstMember: true,
				secondMember: true,
			},
			where: [
				{ firstMember: { id: userId } },
				{ secondMember: { id: userId } },
			],
			select: {
				id: true,
				firstMember: {
					id: true,
				},
				secondMember: {
					id: true,
				},
			},
		})

		const resultConversations = conversations.map(c => ({
			id: c.id,
			firstMemberId: c.firstMember.id,
			secondMemberId: c.secondMember.id,
		}))

		return resultConversations
	}
}

export default new ConversationService()

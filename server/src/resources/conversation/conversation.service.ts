import { Repository } from 'typeorm'
import HttpError from '../../utils/exceptions/http.error'
import awsService from '../aws/aws.service'
import userService from '../user/user.service'
import { appDataSource } from './../../data-source'
import { Conversation } from './conversation.entity'
import {
	getAllUserConversationsOptions,
	getConversationByIdOptions,
} from './conversation.utils'
import ConversationDto from './dtos/conversation.dto'
import CreateConversationInputDto from './dtos/create-conversation-input.dto'
import GetUserConversationsOutputDto from './dtos/get-user-conversations-output.dto'

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

	async getByUsers(senderId: string, receiverId: string) {
		const conversation = await this.conversationRepository.findOne({
			relations: {
				firstMember: true,
				secondMember: true,
			},
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

		return conversation
	}

	async exists(id: string) {
		const exists = await this.conversationRepository.exist({
			where: {
				id,
			},
		})

		return exists
	}

	/**
	 * Creates a conversation between two users. If the conversation already exists, returns the existing one.
	 */
	async create(
		createConversationData: CreateConversationInputDto,
	): Promise<ConversationDto> {
		if (
			createConversationData.senderId ===
			createConversationData.receiverId
		) {
			throw HttpError.BadRequest('Sender and receiver cannot be the same')
		}

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

		const existedConversation = await this.getByUsers(
			createConversationData.senderId,
			createConversationData.receiverId,
		)

		if (existedConversation) {
			return {
				id: existedConversation.id,
				firstMemberId: existedConversation.firstMember.id,
				secondMemberId: existedConversation.secondMember.id,
			}
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

	async getByUserId(
		userId: string,
	): Promise<GetUserConversationsOutputDto[]> {
		const userExists = await userService.exists(userId)

		if (!userExists) {
			throw HttpError.NotFound('User was not found')
		}

		const conversations = await this.conversationRepository.find(
			getAllUserConversationsOptions(userId),
		)

		const resultConversations: GetUserConversationsOutputDto[] =
			await Promise.all(
				conversations.map(async c => {
					let firstMemberImageLink: string | null = null

					let secondMemberImageLink: string | null = null

					if (c.firstMember.image) {
						firstMemberImageLink = await awsService.getImageUrl(
							c.firstMember.image.name,
						)
					}

					if (c.secondMember.image) {
						secondMemberImageLink = await awsService.getImageUrl(
							c.secondMember.image.name,
						)
					}

					return {
						id: c.id,
						firstMember: {
							id: c.firstMember.id,
							name: c.firstMember.name,
							surname: c.firstMember.surname,
							imageLink: firstMemberImageLink,
						},
						secondMember: {
							id: c.secondMember.id,
							name: c.secondMember.name,
							surname: c.secondMember.surname,
							imageLink: secondMemberImageLink,
						},
					}
				}),
			)

		return resultConversations
	}

	async getById(
		conversationId: string,
		currentUserId: string,
	): Promise<GetUserConversationsOutputDto> {
		const conversation = await this.conversationRepository.findOne(
			getConversationByIdOptions(conversationId),
		)

		if (!conversation) {
			throw HttpError.NotFound('Conversation was not found')
		}

		if (
			conversation.firstMember.id !== currentUserId &&
			conversation.secondMember.id !== currentUserId
		) {
			throw HttpError.Forbidden(
				'You can only get conversations with yourself',
			)
		}

		let firstMemberImageLink: string | null = null

		let secondMemberImageLink: string | null = null

		if (conversation.firstMember.image) {
			firstMemberImageLink = await awsService.getImageUrl(
				conversation.firstMember.image.name,
			)
		}

		if (conversation.secondMember.image) {
			secondMemberImageLink = await awsService.getImageUrl(
				conversation.secondMember.image.name,
			)
		}

		return {
			id: conversation.id,
			firstMember: {
				id: conversation.firstMember.id,
				name: conversation.firstMember.name,
				surname: conversation.firstMember.surname,
				imageLink: firstMemberImageLink,
			},
			secondMember: {
				id: conversation.secondMember.id,
				name: conversation.secondMember.name,
				surname: conversation.secondMember.surname,
				imageLink: secondMemberImageLink,
			},
		}
	}
}

export default new ConversationService()

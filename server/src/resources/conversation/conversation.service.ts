import { Repository } from 'typeorm'
import HttpError from '../../utils/exceptions/http.error'
import awsService from '../aws/aws.service'
import messageService from '../message/message.service'
import userService from '../user/user.service'
import { appDataSource } from './../../data-source'
import { Conversation } from './conversation.entity'
import {
	deleteConversationOptions,
	getAllUserConversationsOptions,
	getConversationByIdOptions,
} from './conversation.utils'
import ConversationDto from './dtos/conversation.dto'
import CreateConversationInputDto from './dtos/create-conversation-input.dto'
import GetConversationByIdOutputDto from './dtos/get-conversation-by-id-output.dto'
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

					const lastMessageData =
						await messageService.getLastConversationMessageData(
							c.id,
						)

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
						lastMessageDateOfCreation:
							lastMessageData?.dateOfCreation || null,
						lastMessageSenderId: lastMessageData?.senderId || null,
						lastFirstMemberVisit:
							c.lastFirstMemberVisit?.toISOString() || null,
						lastSecondMemberVisit:
							c.lastSecondMemberVisit?.toISOString() || null,
					}
				}),
			)

		return resultConversations
	}

	async getById(
		conversationId: string,
		currentUserId: string,
	): Promise<GetConversationByIdOutputDto> {
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

	async updateLastVisit(id: string, userId: string) {
		const conversation = await this.conversationRepository.findOne(
			getConversationByIdOptions(id),
		)

		if (!conversation) {
			throw HttpError.NotFound('Conversation was not found')
		}

		if (
			conversation.firstMember.id !== userId &&
			conversation.secondMember.id !== userId
		) {
			throw HttpError.Forbidden(
				'You can only update conversations with yourself',
			)
		}

		if (conversation.firstMember.id === userId) {
			conversation.lastFirstMemberVisit = new Date()
		} else {
			conversation.lastSecondMemberVisit = new Date()
		}

		await this.conversationRepository.save(conversation)
	}

	async delete(id: string, currentUserId: string) {
		const conversation = await this.conversationRepository.findOne(
			deleteConversationOptions(id),
		)

		if (!conversation) {
			throw HttpError.NotFound(`Conversation was not found`)
		}

		if (
			conversation.firstMember.id !== currentUserId &&
			conversation.secondMember.id !== currentUserId
		) {
			throw HttpError.Forbidden(
				'You can only delete conversations with yourself',
			)
		}

		await messageService.deleteByConversationId(id)

		await this.conversationRepository.delete(id)
	}
}

export default new ConversationService()

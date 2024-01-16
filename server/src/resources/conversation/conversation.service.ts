import { Repository } from 'typeorm'
import HttpError from '../../utils/exceptions/http.error'
import awsService from '../aws/aws.service'
import userService from '../user/user.service'
import { appDataSource } from './../../data-source'
import { Conversation } from './conversation.entity'
import { getAllUserConversationsOptions } from './conversation.utils'
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
}

export default new ConversationService()

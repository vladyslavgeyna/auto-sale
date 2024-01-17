import { FindManyOptions } from 'typeorm'
import { Message } from './message.entity'

export const getAllConversationMessagesOptions = (
	conversationId: string,
): FindManyOptions<Message> => ({
	relations: {
		sender: true,
		conversation: {
			firstMember: {
				image: true,
			},
			secondMember: {
				image: true,
			},
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
				name: true,
				surname: true,
				image: {
					name: true,
				},
			},
			secondMember: {
				id: true,
				name: true,
				surname: true,
				image: {
					name: true,
				},
			},
		},
	},
	order: {
		dateOfCreation: 'ASC',
	},
})

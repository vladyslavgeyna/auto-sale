import { FindManyOptions, FindOneOptions } from 'typeorm'
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

export const getLastConversationMessageDataOptions = (
	conversationId: string,
): FindOneOptions<Message> => ({
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

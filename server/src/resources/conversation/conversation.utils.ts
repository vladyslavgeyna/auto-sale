import { FindManyOptions, FindOneOptions } from 'typeorm'
import { Conversation } from './conversation.entity'

export const getAllUserConversationsOptions = (
	userId: string,
): FindManyOptions<Conversation> => ({
	relations: {
		firstMember: {
			image: true,
		},
		secondMember: {
			image: true,
		},
	},
	where: [{ firstMember: { id: userId } }, { secondMember: { id: userId } }],
	select: {
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
		lastFirstMemberVisit: true,
		lastSecondMemberVisit: true,
	},
	order: {
		messages: {
			dateOfCreation: 'ASC',
		},
	},
})

export const getConversationByIdOptions = (
	id: string,
): FindOneOptions<Conversation> => ({
	relations: {
		firstMember: {
			image: true,
		},
		secondMember: {
			image: true,
		},
	},
	where: {
		id,
	},
	select: {
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
})

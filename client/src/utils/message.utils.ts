import IGetConversationMessagesOutput from '@/types/message/get-conversation-messages-output.interface'
import { IMessageQueryData } from '@/types/message/message-query-data.interface'

export const getMessagesQueryDataPages = (
	newMessage: IGetConversationMessagesOutput,
	oldMessagesData: IMessageQueryData | undefined,
) => {
	const updatedPages =
		oldMessagesData?.pages.map(page => ({
			count: page.count + 1,
			messages: [...page.messages, newMessage],
		})) || []

	return {
		pageParams: oldMessagesData?.pageParams || [1],
		pages: updatedPages,
	}
}

export const validateMessage = (message: string) => {
	const newMessage = message.trim()

	if (newMessage && newMessage.length <= 5000) {
		return {
			message: newMessage,
			isValid: true,
		}
	}

	return {
		message: newMessage,
		isValid: false,
	}
}

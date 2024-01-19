import { authApi } from '@/http/index'
import IGetConversationMessagesOutput from '@/types/message/get-conversation-messages-output.interface'
import ISendMessageInput from '@/types/message/send-message-input.interface'
import ISendMessageOutput from '@/types/message/send-message-output.interface'

class MessageService {
	private URI_PREFIX = '/messages'

	getAllConversationMessages = async (
		conversationId: string,
		page: number = 1,
		limit: number = 20,
	) => {
		return authApi.get<{
			messages: IGetConversationMessagesOutput[]
			count: number
		}>(
			`${this.URI_PREFIX}/conversations/${conversationId}?page=${page}&limit=${limit}`,
		)
	}

	sendMessage = async (data: ISendMessageInput) => {
		return authApi.post<ISendMessageOutput>(`${this.URI_PREFIX}`, {
			...data,
		})
	}
}

export default new MessageService()

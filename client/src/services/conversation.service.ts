import { authApi } from '@/http/index'
import ICreateConversationInput from '@/types/conversation/create-conversation-input.interface'
import ICreateConversationOutput from '@/types/conversation/create-conversation-output.interface'
import IGetUserConversationsOutput from '@/types/conversation/get-user-conversations-output.interface'

class ConversationService {
	private URI_PREFIX = '/conversations'

	create = async (createConversationData: ICreateConversationInput) => {
		return authApi.post<ICreateConversationOutput>(`${this.URI_PREFIX}`, {
			...createConversationData,
		})
	}

	getAllUserConversation = async (userId: string) => {
		return authApi.get<IGetUserConversationsOutput[]>(
			`${this.URI_PREFIX}/users/${userId}`,
		)
	}

	getById = async (id: string) => {
		return authApi.get<IGetUserConversationsOutput>(
			`${this.URI_PREFIX}/${id}`,
		)
	}
}

export default new ConversationService()

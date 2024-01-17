import { authApi } from '@/http/index'
import ICreateConversationInput from '@/types/conversation/create-conversation-input.interface'
import ICreateConversationOutput from '@/types/conversation/create-conversation-output.interface'
import IGetConversationByIdOutput from '@/types/conversation/get-conversation-by-id-output.interface'
import IGetUserConversationsOutput from '@/types/conversation/get-user-conversations-output.interface'

class ConversationService {
	private URI_PREFIX = '/conversations'

	create = async (createConversationData: ICreateConversationInput) => {
		return authApi.post<ICreateConversationOutput>(`${this.URI_PREFIX}`, {
			...createConversationData,
		})
	}

	updateLastVisit = async (id: string) => {
		return authApi.put(`${this.URI_PREFIX}/${id}/last-visit`)
	}

	getAllUserConversation = async (userId: string) => {
		return authApi.get<IGetUserConversationsOutput[]>(
			`${this.URI_PREFIX}/users/${userId}`,
		)
	}

	getById = async (id: string) => {
		return authApi.get<IGetConversationByIdOutput>(
			`${this.URI_PREFIX}/${id}`,
		)
	}

	delete = async (id: string) => {
		return authApi.delete(`${this.URI_PREFIX}/${id}`)
	}
}

export default new ConversationService()

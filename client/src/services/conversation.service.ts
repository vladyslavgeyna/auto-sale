import { authApi } from '@/http/index'
import IGetUserConversationsOutput from '@/types/conversation/get-user-conversations-output.interface'

class ConversationService {
	private URI_PREFIX = '/conversations'

	getAllUserConversation = async (userId: string) => {
		return authApi.get<IGetUserConversationsOutput[]>(
			`${this.URI_PREFIX}/users/${userId}`,
		)
	}
}

export default new ConversationService()

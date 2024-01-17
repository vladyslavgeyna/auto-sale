import conversationService from '@/services/conversation.service'
import { useQuery } from '@tanstack/react-query'

export const useGetUserConversations = (userId: string) => {
	return useQuery({
		queryKey: ['user-conversations', userId],
		queryFn: async () => {
			const response = await conversationService.getAllUserConversation(
				userId,
			)
			return response.data
		},
		staleTime: 0,
		retry: false,
	})
}

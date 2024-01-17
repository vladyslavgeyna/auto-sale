import conversationService from '@/services/conversation.service'
import { useQuery } from '@tanstack/react-query'

export const useGetConversation = (id: string) => {
	return useQuery({
		queryKey: ['conversations', id],
		queryFn: async () => {
			const response = await conversationService.getById(id)
			return response.data
		},
		staleTime: 0,
		retry: false,
	})
}

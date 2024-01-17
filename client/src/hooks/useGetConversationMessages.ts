import messageService from '@/services/message.service'
import { useQuery } from '@tanstack/react-query'

export const useGetConversationMessages = (conversationId: string) => {
	return useQuery({
		queryKey: ['conversation-messages', conversationId],
		queryFn: async () => {
			const response = await messageService.getAllConversationMessages(
				conversationId,
			)
			return response.data
		},
		staleTime: 0,
		retry: false,
		refetchOnWindowFocus: false,
	})
}

import messageService from '@/services/message.service'
import { useInfiniteQuery } from '@tanstack/react-query'

export const useGetInfiniteConversationMessages = (conversationId: string) => {
	return useInfiniteQuery({
		queryKey: ['conversation-messages', conversationId],
		queryFn: async ({ pageParam = 1 }) => {
			const { data } = await messageService.getAllConversationMessages(
				conversationId,
				pageParam,
			)
			return data
		},
		getNextPageParam: (lastPage, pages) => {
			return lastPage.messages.length ? pages.length + 1 : undefined
		},
		initialPageParam: 1,
	})
}

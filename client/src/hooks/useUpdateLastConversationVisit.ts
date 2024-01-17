import conversationService from '@/services/conversation.service'
import { useMutation, useQueryClient } from '@tanstack/react-query'

export const useUpdateLastConversationVisit = (id: string) => {
	const queryClient = useQueryClient()

	return useMutation({
		mutationKey: ['update-last-conversation-visit', id],
		mutationFn: conversationService.updateLastVisit,
		onSuccess: async ({ data }) => {
			//const conversationId = data.id
			// await queryClient.invalidateQueries({
			// 	queryKey: ['user-conversations', currentUserId],
			// })
		},
	})
}

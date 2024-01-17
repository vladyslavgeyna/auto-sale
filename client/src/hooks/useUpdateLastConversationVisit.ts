import conversationService from '@/services/conversation.service'
import { useMutation, useQueryClient } from '@tanstack/react-query'

export const useUpdateLastConversationVisit = (
	id: string,
	currentUserId: string,
) => {
	const queryClient = useQueryClient()

	return useMutation({
		mutationKey: ['update-last-conversation-visit', id],
		mutationFn: conversationService.updateLastVisit,
		onSuccess: async () => {
			await queryClient.invalidateQueries({
				queryKey: ['user-conversations', currentUserId],
			})
		},
	})
}

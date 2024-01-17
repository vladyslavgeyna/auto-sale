import conversationService from '@/services/conversation.service'
import { IHttpError } from '@/types/http-error.interface'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { useErrorToast } from './useErrorToast'
import { useSuccessToast } from './useSuccessToast'

export const useDeleteConversation = (id: string, currentUserId: string) => {
	const { errorToast } = useErrorToast()
	const { successToast } = useSuccessToast()
	const queryClient = useQueryClient()

	return useMutation({
		mutationKey: ['delete-conversation', id],
		mutationFn: conversationService.delete,
		onSuccess: async () => {
			successToast(`The conversation is deleted successfully!`)
			await queryClient.invalidateQueries({
				queryKey: ['user-conversations', currentUserId],
			})
		},
		onError: (error: AxiosError) => {
			const httpError = IHttpError.toIHttpError(error)
			errorToast(httpError)
		},
	})
}

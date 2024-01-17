import conversationService from '@/services/conversation.service'
import { IHttpError } from '@/types/http-error.interface'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { useRouter } from 'next/navigation'
import { useErrorToast } from './useErrorToast'

export const useCreateConversation = (currentUserId: string) => {
	const { errorToast } = useErrorToast()
	const queryClient = useQueryClient()
	const router = useRouter()

	return useMutation({
		mutationKey: ['create-message'],
		mutationFn: conversationService.create,
		onSuccess: async ({ data }) => {
			const conversationId = data.id
			router.push(`/chat/${conversationId}`)
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

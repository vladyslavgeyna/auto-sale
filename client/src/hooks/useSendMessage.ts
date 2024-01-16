import messageService from '@/services/message.service'
import IMember from '@/types/conversation/member.interface'
import { IHttpError } from '@/types/http-error.interface'
import IGetConversationMessagesOutput from '@/types/message/get-conversation-messages-output.interface'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { useErrorToast } from './useErrorToast'

export const useSendMessage = (
	conversationId: string,
	firstMember: IMember | undefined,
	secondMember: IMember | undefined,
	reset: () => void,
) => {
	const { errorToast } = useErrorToast()
	const queryClient = useQueryClient()

	return useMutation({
		mutationKey: ['send-message'],
		mutationFn: messageService.sendMessage,
		onSuccess: ({ data }) => {
			reset()
			if (firstMember && secondMember) {
				queryClient.setQueryData<IGetConversationMessagesOutput[]>(
					['conversation-messages', conversationId],
					oldMessages => {
						const newMessage: IGetConversationMessagesOutput = {
							id: data.id,
							text: data.text,
							senderId: data.senderId,
							dateOfCreation: data.dateOfCreation,
							conversationId: data.conversationId,
							firstMember: { ...firstMember },
							secondMember: { ...secondMember },
						}
						return [...(oldMessages || []), newMessage]
					},
				)
			}
		},
		onError: (error: AxiosError) => {
			const httpError = IHttpError.toIHttpError(error)
			errorToast(httpError)
		},
	})
}

import accountService from '@/services/account.service'
import { IHttpError } from '@/types/http-error.interface'
import { useMutation } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { useErrorToast } from './useErrorToast'
import { useSuccessToast } from './useSuccessToast'

export const useSendResetPasswordEmail = (reset?: () => void) => {
	const { errorToast } = useErrorToast()
	const { successToast } = useSuccessToast()

	return useMutation({
		mutationKey: ['send-reset-password-email'],
		mutationFn: accountService.sendResetPasswordEmail,
		onSuccess: () => {
			successToast('The email was sent successfully!')
		},
		onError: (error: AxiosError) => {
			const httpError = IHttpError.toIHttpError(error)
			errorToast(httpError)
		},
		onSettled: () => {
			reset && reset()
		},
	})
}

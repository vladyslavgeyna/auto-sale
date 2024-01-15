import accountService from '@/services/account.service'
import { useMutation } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { useRouter } from 'next/navigation'
import { useSuccessToast } from './useSuccessToast'

export const useResetPassword = (
	handleHttpError: (error: AxiosError) => void,
	resetForm: () => void,
) => {
	const { successToast } = useSuccessToast()
	const router = useRouter()

	return useMutation({
		mutationKey: ['reset-password'],
		mutationFn: accountService.resetPassword,
		onSuccess: () => {
			resetForm()
			successToast('The password was successfully reset!')
			router.push('/')
		},
		onError: (error: AxiosError) => {
			handleHttpError(error)
		},
	})
}

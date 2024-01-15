import accountService from '@/services/account.service'
import { useMutation } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { useRouter } from 'next/navigation'
import { useSuccessToast } from './useSuccessToast'

export const useChangePassword = (
	handleHttpError: (error: AxiosError) => void,
	resetForm: () => void,
) => {
	const { successToast } = useSuccessToast()
	const router = useRouter()

	return useMutation({
		mutationKey: ['change-password'],
		mutationFn: accountService.changePassword,
		onSuccess: () => {
			resetForm()
			successToast('The password was successfully changed!')
			router.push('/account/profile')
		},
		onError: (error: AxiosError) => {
			handleHttpError(error)
		},
	})
}

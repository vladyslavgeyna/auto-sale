import accountService from '@/services/account.service'
import { useMutation } from '@tanstack/react-query'
import { AxiosError } from 'axios'

export const useRegister = (
	handleHttpError: (error: AxiosError) => void,
	resetForm: () => void,
	setEmail: () => void,
) => {
	return useMutation({
		mutationKey: ['register'],
		mutationFn: accountService.register,
		onSuccess: () => {
			setEmail()
			resetForm()
		},
		onError: (error: AxiosError) => {
			handleHttpError(error)
		},
	})
}

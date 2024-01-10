import accountService from '@/services/account.service'
import { useUserStore } from '@/store/user'
import { useMutation } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { useShallow } from 'zustand/react/shallow'

export const useLogin = (
	handleHttpError: (error: AxiosError) => void,
	resetForm: () => void,
) => {
	const { setCredentials } = useUserStore(
		useShallow(state => ({
			setCredentials: state.setCredentials,
		})),
	)

	return useMutation({
		mutationKey: ['login'],
		mutationFn: accountService.login,
		onSuccess: ({ data }) => {
			resetForm()
			setCredentials(data)
		},
		onError: (error: AxiosError) => {
			handleHttpError(error)
		},
	})
}

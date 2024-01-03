import accountService from '@/services/account.service'
import { useUserStore } from '@/store/user'
import { useMutation } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { useRouter } from 'next/navigation'
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

	const router = useRouter()

	return useMutation({
		mutationKey: ['login'],
		mutationFn: accountService.login,
		onSuccess: ({ data }) => {
			resetForm()
			setCredentials(data)
			router.push('/')
		},
		onError: (error: AxiosError) => {
			handleHttpError(error)
		},
	})
}

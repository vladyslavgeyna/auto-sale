import accountService from '@/services/account.service'
import { useUserStore } from '@/store/user'
import { useMutation } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { useRouter } from 'next/navigation'
import { useShallow } from 'zustand/react/shallow'

export const useRegister = (
	handleHttpError: (error: AxiosError) => void,
	resetForm: () => void,
	setEmail: () => void,
) => {
	const { setCredentials } = useUserStore(
		useShallow(state => ({
			setCredentials: state.setCredentials,
		})),
	)

	const router = useRouter()

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

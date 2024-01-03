import accountService from '@/services/account.service'
import { useMutation } from '@tanstack/react-query'
import { redirect } from 'next/navigation'

export const useLogout = (removeCredentials: () => void) => {
	return useMutation({
		mutationKey: ['logout'],
		mutationFn: accountService.logout,
		onSuccess: () => {
			removeCredentials()
			redirect('/')
		},
	})
}

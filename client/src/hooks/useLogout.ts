import accountService from '@/services/account.service'
import { useMutation } from '@tanstack/react-query'

export const useLogout = (removeCredentials: () => void) => {
	return useMutation({
		mutationKey: ['logout'],
		mutationFn: accountService.logout,
		onSuccess: () => {
			removeCredentials()
			location.href = `${String(process.env.NEXT_PUBLIC_CLIENT_URL)}/`
		},
	})
}

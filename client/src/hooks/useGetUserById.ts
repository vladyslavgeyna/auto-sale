import userService from '@/services/user.service'
import { useQuery } from '@tanstack/react-query'

export const useGetUserById = (userId: string) => {
	return useQuery({
		queryKey: ['user', userId],
		queryFn: async () => {
			const response = await userService.getById(userId)
			return response.data
		},
		staleTime: 1000 * 60,
		retry: false,
	})
}

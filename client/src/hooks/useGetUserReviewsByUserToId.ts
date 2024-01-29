import userReviewService from '@/services/user-review.service'
import { useQuery } from '@tanstack/react-query'

export const useGetUserReviewsByUserToId = (userToId: string) => {
	return useQuery({
		queryKey: ['user-reviews', userToId],
		queryFn: async () => {
			const response = await userReviewService.getByUserToId(userToId)
			return response.data
		},
		staleTime: 1000 * 60,
		retry: false,
	})
}

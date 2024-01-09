import carAdService from '@/services/car-ad.service'
import { useQuery } from '@tanstack/react-query'

export const useGetUserCarAds = (userId: string) => {
	return useQuery({
		queryKey: ['user-car-ads', userId],
		queryFn: async () => {
			const response = await carAdService.getAllUserCarAds(userId)
			return response.data
		},
		staleTime: 1000 * 60,
		retry: false,
	})
}

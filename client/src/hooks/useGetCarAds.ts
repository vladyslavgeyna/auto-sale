import carAdService from '@/services/car-ad.service'
import { useQuery } from '@tanstack/react-query'

export const useGetCarAds = () => {
	return useQuery({
		queryKey: ['car-ads'],
		queryFn: async () => {
			const response = await carAdService.getAll()
			return response.data
		},
		staleTime: 1000 * 60,
		retry: false,
	})
}

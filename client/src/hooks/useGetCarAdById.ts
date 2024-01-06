import carAdService from '@/services/car-ad.service'
import { useQuery } from '@tanstack/react-query'

export const useGetCarAdById = (carAdId: number) => {
	return useQuery({
		queryKey: ['car-ad', carAdId],
		queryFn: async () => {
			const response = await carAdService.getById(carAdId)
			return response.data
		},
		staleTime: 1000 * 60,
		retry: false,
	})
}

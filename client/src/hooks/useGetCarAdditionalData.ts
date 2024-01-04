import carService from '@/services/car.service'
import { useQuery } from '@tanstack/react-query'

export const useGetCarAdditionalData = () => {
	return useQuery({
		queryKey: ['car-additional-data'],
		queryFn: async () => {
			const response = await carService.getAdditionalData()
			return response.data
		},
		staleTime: 1000 * 60,
		retry: false,
	})
}

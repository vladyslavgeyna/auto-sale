import carComparisonService from '@/services/car-comparison.service'
import { useQuery } from '@tanstack/react-query'

export const useExistsCarComparison = (carAdId: number, isEnabled: boolean) => {
	return useQuery({
		queryKey: ['car-comparison-exists', carAdId],
		queryFn: async () => {
			const response = await carComparisonService.exists(carAdId)
			return response.data
		},
		staleTime: 0,
		retry: false,
		enabled: isEnabled,
	})
}

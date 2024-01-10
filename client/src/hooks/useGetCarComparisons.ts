import carComparisonService from '@/services/car-comparison.service'
import { useQuery } from '@tanstack/react-query'

export const useGetCarComparisons = () => {
	return useQuery({
		queryKey: ['car-comparisons'],
		queryFn: async () => {
			const response = await carComparisonService.getAll()
			return response.data
		},
		staleTime: 1000 * 60,
		retry: false,
	})
}

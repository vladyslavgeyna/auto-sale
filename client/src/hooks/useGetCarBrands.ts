import carBrandService from '@/services/car-brand.service'
import { useQuery } from '@tanstack/react-query'

export const useGetCarBrands = () => {
	return useQuery({
		queryKey: ['car-brands'],
		queryFn: async () => {
			const response = await carBrandService.getAll()
			return response.data
		},
		staleTime: 1000 * 60,
		retry: false,
	})
}

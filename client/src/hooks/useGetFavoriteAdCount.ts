import favoriteAdService from '@/services/favorite-ad.service'
import { useQuery } from '@tanstack/react-query'

export const useGetFavoriteAdCount = (carAdId: number) => {
	return useQuery({
		queryKey: ['favorite-ad-count', carAdId],
		queryFn: async () => {
			const response = await favoriteAdService.getCountByCarAdId(carAdId)
			return response.data
		},
		staleTime: 1000 * 60,
		retry: false,
	})
}

import favoriteAdService from '@/services/favorite-ad.service'
import { useQuery } from '@tanstack/react-query'

export const useExistsFavoriteAd = (carAdId: number) => {
	return useQuery({
		queryKey: ['favorite-ad-exists', carAdId],
		queryFn: async () => {
			const response = await favoriteAdService.exists(carAdId)
			return response.data
		},
		staleTime: 1000 * 60,
		retry: false,
	})
}

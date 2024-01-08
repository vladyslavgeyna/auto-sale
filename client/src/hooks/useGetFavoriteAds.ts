import favoriteAdService from '@/services/favorite-ad.service'
import { useQuery } from '@tanstack/react-query'

export const useGetFavoriteAds = () => {
	return useQuery({
		queryKey: ['favorite-ads'],
		queryFn: async () => {
			const response = await favoriteAdService.getAll()
			return response.data
		},
		staleTime: 1000 * 60,
		retry: false,
	})
}

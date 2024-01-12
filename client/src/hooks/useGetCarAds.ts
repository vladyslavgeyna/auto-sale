import carAdService, { IGetCarAdsQueryParams } from '@/services/car-ad.service'
import { useQuery } from '@tanstack/react-query'

export const useGetCarAds = (params: IGetCarAdsQueryParams) => {
	let paramsUrl = `?page=${params.page}&limit=${params.limit}`

	for (const key in params) {
		if (key in params && key !== 'page' && key !== 'limit') {
			if (params[key as keyof IGetCarAdsQueryParams]) {
				paramsUrl += `&${key}=${
					params[key as keyof IGetCarAdsQueryParams]
				}`
			}
		}
	}

	return useQuery({
		queryKey: ['car-ads', paramsUrl],
		queryFn: async () => {
			const response = await carAdService.getAll(paramsUrl)
			return response.data
		},
		staleTime: 1000 * 30,
		retry: false,
	})
}

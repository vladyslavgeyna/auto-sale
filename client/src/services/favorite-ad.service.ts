import { api, authApi } from '@/http/index'
import { IGetFavoriteAdsOutput } from '@/types/favorite-ad/get-favorite-ads-output.interface'
import { IToggleFavoriteAdOutput } from '@/types/favorite-ad/toggle-favorite-ad-output.interface'

class FavoriteAd {
	private URI_PREFIX = '/favorite-ads'

	getCountByCarAdId = async (carAdId: number) => {
		return api.get<{ count: number }>(
			`${this.URI_PREFIX}/count/car-ads/${carAdId}`,
		)
	}

	exists = async (carAdId: number) => {
		return authApi.get<boolean>(
			`${this.URI_PREFIX}/exists/car-ads/${carAdId}`,
		)
	}

	toggle = async (carAdId: number) => {
		return authApi.post<IToggleFavoriteAdOutput>(
			`${this.URI_PREFIX}/toggle`,
			{ carAdId },
		)
	}

	getAll = async () => {
		await new Promise(resolve => setTimeout(resolve, 2000))
		return authApi.get<IGetFavoriteAdsOutput>(`${this.URI_PREFIX}`)
	}
}

export default new FavoriteAd()

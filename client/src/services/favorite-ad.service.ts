import { api, authApi } from '@/http/index'
import { IToggleFavoriteAdOutput } from '@/types/favorite-ad/toggle-favorite-ad-output.interface'

class FavoriteAd {
	private URI_PREFIX = '/favorite-ads'

	getCountByCarAdId = async (carAdId: number) => {
		return api.get<{ count: number }>(
			`${this.URI_PREFIX}/count/car-ads/${carAdId}`,
		)
	}

	exists = async (carAdId: number) => {
		console.log('exists fav ad')
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
}

export default new FavoriteAd()

import { authApi } from '@/http/index'
import { IToggleCarComparisonOutput } from '@/types/car-comparison/toggle-car-comparison-output.interface'

class CarComparisonService {
	private URI_PREFIX = '/car-comparisons'

	exists = async (carAdId: number) => {
		return authApi.get<boolean>(
			`${this.URI_PREFIX}/exists/car-ads/${carAdId}`,
		)
	}

	toggle = async (carAdId: number) => {
		return authApi.post<IToggleCarComparisonOutput>(
			`${this.URI_PREFIX}/toggle`,
			{ carAdId },
		)
	}
}

export default new CarComparisonService()

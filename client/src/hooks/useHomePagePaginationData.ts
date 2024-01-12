import { useSearchParams } from 'next/navigation'

export const useHomePagePaginationData = () => {
	const limit = 20
	const searchParams = useSearchParams()
	return {
		page: Number(searchParams.get('page')) || 1,
		limit,
	}
}

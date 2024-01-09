import MyAdsPage from '@/components/my-ads-page/MyAdsPage'
import RequireAuth from '@/hoc/RequireAuth'

const FavoriteAds = () => {
	return (
		<RequireAuth>
			<MyAdsPage />
		</RequireAuth>
	)
}

export default FavoriteAds

'use client'
import FavoriteAdsList from '@/components/favorite-ads-list/FavoriteAdsList'
import FavoriteAdsListSkeleton from '@/components/favorite-ads-list/FavoriteAdsListSkeleton'
import Title from '@/components/ui/Title'
import RequireAuth from '@/hoc/RequireAuth'
import { useGetFavoriteAds } from '@/hooks/useGetFavoriteAds'
import { Loader2 } from 'lucide-react'
import { redirect } from 'next/navigation'

const FavoriteAds = () => {
	const {
		data: favoriteAdsData,
		isLoading: areFavoriteAdsLoading,
		isSuccess: isGettingFavoriteAdsSuccess,
		isError: isGettingFavoriteAdsError,
	} = useGetFavoriteAds()

	if (
		!areFavoriteAdsLoading &&
		(!isGettingFavoriteAdsSuccess || isGettingFavoriteAdsError)
	) {
		redirect('/error')
	}

	const hasDataLoadedAndItExists =
		!areFavoriteAdsLoading &&
		favoriteAdsData &&
		favoriteAdsData.favoriteAds.length > 0

	return (
		<RequireAuth>
			<div>
				{(areFavoriteAdsLoading || hasDataLoadedAndItExists) && (
					<Title className='mb-3'>Favorite Ads</Title>
				)}
				{areFavoriteAdsLoading ? (
					<div>
						<p className='mb-3 text-xl'>
							Total ads:{' '}
							<Loader2 className='h-6 w-6 animate-spin inline-block' />
						</p>
						<FavoriteAdsListSkeleton />
					</div>
				) : hasDataLoadedAndItExists ? (
					<div>
						<p className='mb-3 text-xl'>
							Total ads: {favoriteAdsData.count}
						</p>
						<FavoriteAdsList
							favoriteAds={favoriteAdsData.favoriteAds}
						/>
					</div>
				) : (
					<Title className='text-center'>
						You don't have any favorite ad
					</Title>
				)}
			</div>
		</RequireAuth>
	)
}

export default FavoriteAds

'use client'

import { useGetUserCarAds } from '@/hooks/useGetUserCarAds'
import { useUserStore } from '@/store/user'
import { Loader2 } from 'lucide-react'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import { useShallow } from 'zustand/react/shallow'
import MyAdsList from '../my-ads-list/MyAdsList'
import MyAdsListSkeleton from '../my-ads-list/MyAdsListSkeleton'
import Title from '../ui/Title'

const MyAdsPage = () => {
	const { user } = useUserStore(
		useShallow(state => ({
			user: state.user,
		})),
	)

	if (!user) {
		redirect('/')
	}

	const {
		data: userCarAdsData,
		isLoading: areUserCarAdsLoading,
		isSuccess: isGettingUserCarAdsSuccess,
		isError: isGettingUserCarAdsError,
	} = useGetUserCarAds(user.id)

	if (
		!areUserCarAdsLoading &&
		(!isGettingUserCarAdsSuccess || isGettingUserCarAdsError)
	) {
		redirect('/error')
	}

	const hasDataLoadedAndItExists =
		!areUserCarAdsLoading &&
		userCarAdsData &&
		userCarAdsData.carAds.length > 0

	return (
		<div>
			{(areUserCarAdsLoading || hasDataLoadedAndItExists) && (
				<Title className='mb-3'>My ads</Title>
			)}
			{areUserCarAdsLoading ? (
				<div>
					<p className='mb-3 text-xl'>
						Total ads:{' '}
						<Loader2 className='h-6 w-6 animate-spin inline-block' />
					</p>
					<MyAdsListSkeleton />
				</div>
			) : hasDataLoadedAndItExists ? (
				<div>
					<p className='mb-3 text-xl'>
						Total ads: {userCarAdsData.count}
					</p>
					<MyAdsList carAds={userCarAdsData.carAds} />
				</div>
			) : (
				<Title>
					You haven't created any car ad yet. But you can{' '}
					<Link href={'/car-ad/create'}>create one</Link>
				</Title>
			)}
		</div>
	)
}

export default MyAdsPage

'use client'

import Loader from '@/components/loader/Loader'
import { useUserStore } from '@/store/user'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { useShallow } from 'zustand/react/shallow'

type PropsType = {
	searchParams?: {
		accessToken: string
		id: string
		email: string
		name: string
		surname: string
		phone: string
		imageLink?: string
	}
}

const SuccessGoogleLogin = ({ searchParams }: PropsType) => {
	const router = useRouter()
	const { setCredentials, isAuthenticated } = useUserStore(
		useShallow(state => ({
			setCredentials: state.setCredentials,
			isAuthenticated: state.isAuthenticated,
		})),
	)

	useEffect(() => {
		if (
			isAuthenticated ||
			!searchParams?.accessToken ||
			!searchParams?.email ||
			!searchParams?.name ||
			!searchParams?.surname ||
			!searchParams?.id
		) {
			return router.push('/')
		}

		setCredentials({
			accessToken: searchParams.accessToken,
			id: searchParams.id,
			email: searchParams.email,
			name: searchParams.name,
			surname: searchParams.surname,
			phone: searchParams.phone || null,
			imageLink: searchParams.imageLink
				? decodeURIComponent(searchParams?.imageLink)
				: null,
		})

		return router.push('/')
	}, [])

	return (
		<div className='w-full mt-80 flex items-center justify-center'>
			<Loader />
		</div>
	)
}

export default SuccessGoogleLogin

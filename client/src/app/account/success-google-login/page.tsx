'use client'

import Loader from '@/components/loader/Loader'
import { useUserStore } from '@/store/user'
import { UserRole } from '@/types/user/user-role.interface'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { useShallow } from 'zustand/react/shallow'

type PropsType = {
	searchParams?: {
		accessToken: string
		id: string
		email: string
		name: string
		role: string
		surname: string
		phone?: string
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
		console.log('in use effect searchParams', searchParams)

		if (
			isAuthenticated ||
			!searchParams?.accessToken ||
			!searchParams?.email ||
			!searchParams?.name ||
			!searchParams?.surname ||
			!searchParams?.role ||
			!searchParams?.id ||
			!['user', 'admin', 'moderator'].includes(searchParams.role)
		) {
			console.log('not good')
			return router.push('/')
		}

		console.log('searchParams', searchParams)

		setCredentials({
			role: searchParams.role as UserRole,
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

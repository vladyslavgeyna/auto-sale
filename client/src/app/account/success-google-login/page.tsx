'use client'

import Loader from '@/components/loader/Loader'
import { useUserStore } from '@/store/user'
import { UserRole } from '@/types/user/user-role.interface'
import { redirect, useSearchParams } from 'next/navigation'
import { useEffect } from 'react'
import { useShallow } from 'zustand/react/shallow'

const SuccessGoogleLogin = () => {
	const { setCredentials, isAuthenticated } = useUserStore(
		useShallow(state => ({
			setCredentials: state.setCredentials,
			isAuthenticated: state.isAuthenticated,
		})),
	)

	const searchParams = useSearchParams()

	useEffect(() => {
		const searchParamsData = {
			imageLink: searchParams.get('imageLink'),
			phone: searchParams.get('phone'),
			surname: searchParams.get('surname'),
			name: searchParams.get('name'),
			email: searchParams.get('email'),
			id: searchParams.get('id'),
			accessToken: searchParams.get('accessToken'),
			role: searchParams.get('role'),
		}

		if (
			isAuthenticated ||
			!searchParamsData.accessToken ||
			!searchParamsData.email ||
			!searchParamsData.name ||
			!searchParamsData.surname ||
			!searchParamsData.role ||
			!searchParamsData.id ||
			!['user', 'admin', 'moderator'].includes(searchParamsData.role)
		) {
			redirect('/')
		}

		setCredentials({
			role: searchParamsData.role as UserRole,
			accessToken: searchParamsData.accessToken,
			id: searchParamsData.id,
			email: searchParamsData.email,
			name: searchParamsData.name,
			surname: searchParamsData.surname,
			phone: searchParamsData.phone || null,
			imageLink: searchParamsData.imageLink || null,
		})

		redirect('/')
	}, [])

	return (
		<div className='w-full mt-80 flex items-center justify-center'>
			<Loader />
		</div>
	)
}

export default SuccessGoogleLogin

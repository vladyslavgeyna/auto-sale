'use client'

import Forbidden from '@/components/forbidden/Forbidden'
import Loader from '@/components/loader/Loader'
import { useUserStore } from '@/store/user'
import { redirect } from 'next/navigation'
import { useShallow } from 'zustand/react/shallow'

const RequireAdmin = ({ children }: { children: React.ReactNode }) => {
	const { isAuthenticated, isCheckingAuthFinished, isLoading, user } =
		useUserStore(
			useShallow(state => ({
				isAuthenticated: state.isAuthenticated,
				isCheckingAuthFinished: state.isCheckingAuthFinished,
				isLoading: state.isLoading,
				user: state.user,
			})),
		)

	if (isLoading || !isCheckingAuthFinished) {
		return (
			<div className='w-full mt-80 flex items-center justify-center'>
				<Loader />
			</div>
		)
	}

	if (!isAuthenticated && isCheckingAuthFinished) {
		redirect('/account/login')
	}

	if (isAuthenticated && isCheckingAuthFinished && user?.role !== 'admin') {
		return <Forbidden />
	}

	return children
}

export default RequireAdmin

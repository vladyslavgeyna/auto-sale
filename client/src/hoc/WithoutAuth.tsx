'use client'

import Loader from '@/components/loader/Loader'
import { useUserStore } from '@/store/user'
import { redirect } from 'next/navigation'
import { useShallow } from 'zustand/react/shallow'

const WithoutAuth = ({ children }: { children: React.ReactNode }) => {
	const { isAuthenticated, isCheckingAuthFinished, isLoading } = useUserStore(
		useShallow(state => ({
			isAuthenticated: state.isAuthenticated,
			isCheckingAuthFinished: state.isCheckingAuthFinished,
			isLoading: state.isLoading,
		})),
	)

	if (isLoading || !isCheckingAuthFinished) {
		return (
			<div className='w-full mt-80 flex items-center justify-center'>
				<Loader />
			</div>
		)
	}

	if (isAuthenticated && isCheckingAuthFinished) {
		redirect('/')
	}

	return children
}

export default WithoutAuth

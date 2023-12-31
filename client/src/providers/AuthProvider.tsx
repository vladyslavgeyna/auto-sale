'use client'

import accountService from '@/services/account.service'
import { useUserStore } from '@/store/user'
import { IHttpError } from '@/types/http-error.interface'
import { AxiosError } from 'axios'
import React, { useEffect } from 'react'
import { useShallow } from 'zustand/react/shallow'

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
	const {
		setError,
		setIsAuthenticated,
		setIsLoading,
		setUser,
		setIsCheckingAuthFinished,
	} = useUserStore(
		useShallow(state => ({
			setIsAuthenticated: state.setIsAuthenticated,
			setUser: state.setUser,
			setError: state.setError,
			setIsLoading: state.setIsLoading,
			setIsCheckingAuthFinished: state.setIsCheckingAuthFinished,
		})),
	)

	useEffect(() => {
		if (localStorage.getItem('accessToken')) {
			setIsLoading(true)
			accountService
				.refresh()
				.then(({ data }) => {
					setError(null)
					setUser({
						id: data.id,
						email: data.email,
						name: data.name,
						surname: data.surname,
						phone: data.phone,
						imageName: data.imageName,
					})
					setIsAuthenticated(true)
					localStorage.setItem('accessToken', data.accessToken)
				})
				.catch((error: AxiosError) => {
					setUser(null)
					setIsAuthenticated(false)
					localStorage.removeItem('accessToken')

					const errorData = error.response?.data
					if (IHttpError.isHttpError(errorData)) {
						setError(errorData)
					} else {
						setError({ errors: [], message: 'Unexpected error' })
					}
				})
				.finally(() => {
					setIsLoading(false)
					setIsCheckingAuthFinished(true)
				})
		}
		setIsCheckingAuthFinished(true)
	}, [])

	return <>{children}</>
}

export default AuthProvider

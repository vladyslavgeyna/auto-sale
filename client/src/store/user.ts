import { IHttpError } from '@/types/http-error.interface'
import { ILoginOutput } from '@/types/user/login-output.interface'
import { IUser } from '@/types/user/user.interface'
import { create } from 'zustand'

interface IUserStore {
	user: IUser | null
	error: IHttpError | null
	isLoading: boolean
	isAuthenticated: boolean
	isCheckingAuthFinished: boolean
	setUser: (user: IUser | null) => void
	setError: (error: IHttpError | null) => void
	setIsLoading: (isLoading: boolean) => void
	setIsCheckingAuthFinished: (isCheckingAuthFinished: boolean) => void
	setIsAuthenticated: (isAuthenticated: boolean) => void
	setCredentials: (credentials: ILoginOutput) => void
	removeCredentials: () => void
}

export const useUserStore = create<IUserStore>(set => ({
	isLoading: false,
	isAuthenticated: false,
	isCheckingAuthFinished: false,
	error: null,
	user: null,
	setUser: (user: IUser | null) => {
		set(() => ({ user }))
	},
	setError: (error: IHttpError | null) => {
		set(() => ({ error }))
	},
	setIsLoading: (isLoading: boolean) => {
		set(() => ({ isLoading }))
	},
	setIsAuthenticated: (isAuthenticated: boolean) => {
		set(() => ({ isAuthenticated }))
	},
	setIsCheckingAuthFinished: (isCheckingAuthFinished: boolean) => {
		set(() => ({ isCheckingAuthFinished }))
	},
	setCredentials: (credentials: ILoginOutput) => {
		set(() => ({
			user: {
				id: credentials.id,
				name: credentials.name,
				surname: credentials.surname,
				email: credentials.email,
				phone: credentials.phone,
				imageLink: credentials.imageLink,
				role: credentials.role,
			},
			isAuthenticated: true,
		}))
		localStorage.setItem('accessToken', credentials.accessToken)
	},
	removeCredentials: () => {
		set(() => ({
			user: null,
			isAuthenticated: false,
		}))
		localStorage.removeItem('accessToken')
	},
}))

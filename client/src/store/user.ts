import { IHttpError } from '@/types/http-error.interface'
import { ILoginOutput } from '@/types/user/login-output.interface'
import { IUser } from '@/types/user/user.interface'
import { create } from 'zustand'

interface IUserStore {
	user: IUser | null
	error: IHttpError | null
	isLoading: boolean
	isAuthenticated: boolean
	setUser: (user: IUser) => void
	setError: (error: IHttpError) => void
	setIsLoading: (isLoading: boolean) => void
	setIsAuthenticated: (isAuthenticated: boolean) => void
	setCredentials: (credentials: ILoginOutput) => void
}

export const useUserStore = create<IUserStore>(set => ({
	isLoading: false,
	isAuthenticated: false,
	error: null,
	user: null,
	setUser: (user: IUser) => {
		set(() => ({ user }))
	},
	setError: (error: IHttpError) => {
		set(() => ({ error }))
	},
	setIsLoading: (isLoading: boolean) => {
		set(() => ({ isLoading }))
	},
	setIsAuthenticated: (isAuthenticated: boolean) => {
		set(() => ({ isAuthenticated }))
	},
	setCredentials: (credentials: ILoginOutput) => {
		set(() => ({
			user: {
				id: credentials.id,
				name: credentials.name,
				surname: credentials.surname,
				email: credentials.email,
				phone: credentials.phone,
				imageName: credentials.imageName,
			},
			isAuthenticated: true,
		}))
		localStorage.setItem('accessToken', credentials.accessToken)
	},
}))

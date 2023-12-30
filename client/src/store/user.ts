import { IHttpError } from '@/types/http-error.interface'
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
}))

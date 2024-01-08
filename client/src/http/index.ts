import accountService from '@/services/account.service'
import axios from 'axios'

const API_URL = String(process.env.NEXT_PUBLIC_API_URL) + '/api'

export const api = axios.create({
	baseURL: API_URL,
	withCredentials: false,
})

export const credentialsApi = axios.create({
	baseURL: API_URL,
	withCredentials: true,
})

export const authApi = axios.create({
	baseURL: API_URL,
	withCredentials: false,
})

authApi.interceptors.request.use(config => {
	const accessToken = localStorage.getItem('accessToken')
	config.headers.Authorization = `Bearer ${accessToken}`
	return config
})

authApi.interceptors.response.use(
	config => {
		return config
	},
	async error => {
		const originalRequest = error.config
		if (
			error.response.status === 401 &&
			error.config &&
			!error.config._retry
		) {
			originalRequest._retry = true
			try {
				const response = await accountService.refresh()

				localStorage.setItem('accessToken', response.data.accessToken)
				return authApi.request(originalRequest)
			} catch (error) {
				console.log(error)
			}
		}

		await accountService.logout()

		localStorage.removeItem('accessToken')

		throw error
	},
)

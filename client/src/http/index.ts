import axios from 'axios'

const API_URL = String(process.env.NEXT_PUBLIC_API_URL)

export const api = axios.create({
	baseURL: API_URL + '/api',
	withCredentials: false,
})

export const credentialsApi = axios.create({
	baseURL: API_URL + '/api',
	withCredentials: true,
})

export const authApi = axios.create({
	baseURL: API_URL + '/api',
	withCredentials: false,
})

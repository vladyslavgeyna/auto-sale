import { AxiosError } from 'axios'

export class IHttpError {
	message!: string
	errors!: string[]

	static isHttpError(error: any): error is IHttpError {
		//return error.message && error.errors
		return 'message' in error && 'errors' in error
	}

	static isClientError(error: AxiosError) {
		return error.response?.status && error.response?.status < 500
	}
}

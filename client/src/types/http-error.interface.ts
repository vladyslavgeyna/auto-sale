import { AxiosError } from 'axios'

export class IHttpError {
	message!: string
	errors!: string[]
	status?: number

	static isHttpError(error: any): error is IHttpError {
		return 'message' in error && 'errors' in error
	}

	static isClientError(error: AxiosError) {
		return error.response?.status && error.response?.status < 500
	}

	static toIHttpError(error: AxiosError): IHttpError | null {
		const errorData = error.response?.data

		if (
			IHttpError.isHttpError(errorData) &&
			IHttpError.isClientError(error)
		) {
			if (error.response?.status) {
				errorData.status = error.response.status
			}
			return errorData
		} else {
			return null
		}
	}
}

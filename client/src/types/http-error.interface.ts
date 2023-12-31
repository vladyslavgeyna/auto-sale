export class IHttpError {
	message!: string
	errors!: string[]

	static isHttpError(error: any): error is IHttpError {
		//return error.message && error.errors
		return 'message' in error && 'errors' in error
	}
}

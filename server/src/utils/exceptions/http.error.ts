import HttpStatusCode from '../enums/http-status-code'

class HttpError extends Error {
	public readonly status: number
	public readonly errors: string[]

	constructor(status: number, message: string, errors: string[] = []) {
		super(message)
		this.status = status
		this.errors = errors
	}

	/**
	 *
	 * @returns HttpError with status 401 and message 'User is not authorized'
	 */
	static UnauthorizedError() {
		return new HttpError(
			HttpStatusCode.UNAUTHORIZED_401,
			'User is not authorized',
		)
	}

	/**
	 *
	 * @param message Error message
	 * @param errors Array of errors. Empty by default
	 * @returns HttpError with status 403
	 */
	static Forbidden(message: string, errors: string[] = []) {
		return new HttpError(HttpStatusCode.FORBIDDEN_403, message, errors)
	}

	/**
	 *
	 * @param message Error message
	 * @param errors Array of errors. Empty by default
	 * @returns HttpError with status 400
	 */
	static BadRequest(message: string, errors: string[] = []) {
		return new HttpError(HttpStatusCode.BAD_REQUEST_400, message, errors)
	}

	/**
	 *
	 * @param message Error message
	 * @param errors Array of errors. Empty by default
	 * @returns HttpError with status 404
	 */
	static NotFound(message: string, errors: string[] = []) {
		return new HttpError(HttpStatusCode.NOT_FOUND_404, message, errors)
	}
}

export default HttpError

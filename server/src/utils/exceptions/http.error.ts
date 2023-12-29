import HttpStatusCode from '../enums/http-status-code'

class HttpError extends Error {
	public readonly status: number
	public readonly errors: string[]

	constructor(status: number, message: string, errors: string[] = []) {
		super(message)
		this.status = status
		this.errors = errors
	}

	static UnauthorizedError() {
		return new HttpError(
			HttpStatusCode.UNAUTHORIZED_401,
			'User is not authorized',
		)
	}

	static Forbidden(message: string, errors: string[] = []) {
		return new HttpError(HttpStatusCode.FORBIDDEN_403, message, errors)
	}

	static BadRequest(message: string, errors: string[] = []) {
		return new HttpError(HttpStatusCode.BAD_REQUEST_400, message, errors)
	}

	static NotFound(message: string, errors: string[] = []) {
		return new HttpError(HttpStatusCode.NOT_FOUND_404, message, errors)
	}
}

export default HttpError

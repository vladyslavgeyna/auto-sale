import { NextFunction, Request, Response } from 'express'
import HttpError from '../utils/exceptions/http.error'

const errorMiddleware = (
	err: Error,
	_req: Request,
	res: Response,
	_next: NextFunction,
) => {
	console.log(err)
	if (err instanceof HttpError) {
		return res
			.status(err.status)
			.json({ message: err.message, errors: err.errors })
	}

	return res.status(500).json({ message: err.message })
}

export default errorMiddleware

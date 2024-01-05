import { NextFunction, Request, Response } from 'express'
import redisClient from '../../../redis'
import GetAdditionalDataOutputDto from '../dtos/get-additional-data-output.dto'

export const additionalDataCache = async (
	_req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		const data = await redisClient.get<GetAdditionalDataOutputDto>(
			'additional-data',
		)
		if (data) {
			res.json(data)
		} else {
			next()
		}
	} catch (error) {
		next(error)
	}
}

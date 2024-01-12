import { NextFunction, Response } from 'express'
import redisClient from '../../../redis'
import { RequestWithParams } from '../../../utils/types/request.type'
import { GetCarAdByIdOutput } from '../dtos/get-car-ad-by-id-output.dto'

export const getByIdCache = async (
	req: RequestWithParams<{ id: string }>,
	res: Response,
	next: NextFunction,
) => {
	try {
		const key = redisClient.constructKey('car-ads', Number(req.params.id))
		const data = await redisClient.get<GetCarAdByIdOutput>(key)
		if (data) {
			res.json(data)
		} else {
			next()
		}
	} catch (error) {
		next(error)
	}
}

import { NextFunction, Response } from 'express'
import redisClient from '../../../redis'
import { RequestWithQuery } from '../../../utils/types/request.type'
import { GetAllCarAdsOutputDto } from '../dtos/get-all-car-ads-output.dto'

export const getAllCache = async (
	req: RequestWithQuery<{ carBrandId?: string }>,
	res: Response,
	next: NextFunction,
) => {
	try {
		const key = redisClient.constructKey('car-ad')

		const data = await redisClient.get<GetAllCarAdsOutputDto>(key)
		if (data) {
			res.json(data)
		} else {
			next()
		}
	} catch (error) {
		next(error)
	}
}

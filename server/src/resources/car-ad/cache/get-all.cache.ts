import { NextFunction, Response } from 'express'
import redisClient from '../../../redis'
import { RequestWithQuery } from '../../../utils/types/request.type'
import { GetAllCarAdsInputDto } from '../dtos/get-all-car-ads-input.dto'
import { GetAllCarAdsOutputDto } from '../dtos/get-all-car-ads-output.dto'

export const getAllCache = async (
	req: RequestWithQuery<GetAllCarAdsInputDto>,
	res: Response,
	next: NextFunction,
) => {
	try {
		const key = redisClient.constructKeyFromQuery('car-ads', req.query)
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

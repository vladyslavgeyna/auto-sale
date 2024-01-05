import { NextFunction, Response } from 'express'
import redisClient from '../../../redis'
import { EnumDto } from '../../../utils/enums/enum.dto'
import { RequestWithQuery } from '../../../utils/types/request.type'

export const getAllCache = async (
	req: RequestWithQuery<{ carBrandId?: string }>,
	res: Response,
	next: NextFunction,
) => {
	try {
		const carBrandIdParam = req.query.carBrandId
			? Number(req.query.carBrandId)
			: undefined

		const carBrandId = carBrandIdParam || undefined

		const key = redisClient.constructKey(
			'car-model',
			undefined,
			'car-brand',
			carBrandId,
		)

		const data = await redisClient.get<EnumDto[]>(key)
		if (data) {
			console.log('data from cache')
			res.json(data)
		} else {
			next()
		}
	} catch (error) {
		next(error)
	}
}

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
		const carBrandId = req.query.carBrandId
			? Number(req.query.carBrandId) || undefined
			: undefined

		const key = redisClient.constructKey(
			'car-models',
			undefined,
			'car-brands',
			carBrandId,
		)

		const data = await redisClient.get<EnumDto[]>(key)
		if (data) {
			res.json(data)
		} else {
			next()
		}
	} catch (error) {
		next(error)
	}
}

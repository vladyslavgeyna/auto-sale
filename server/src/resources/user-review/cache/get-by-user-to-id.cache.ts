import { NextFunction, Response } from 'express'
import redisClient from '../../../redis'
import { RequestWithParams } from '../../../utils/types/request.type'
import GetUserReviewsByUserToIdOutputDto from '../dtos/get-user-reviews-by-user-to-id-output.dto'

export const getByUserToIdCache = async (
	req: RequestWithParams<{ userToId: string }>,
	res: Response,
	next: NextFunction,
) => {
	try {
		const key = redisClient.constructKey(
			'user-reviews',
			undefined,
			'users',
			req.params.userToId,
		)
		const data = await redisClient.get<GetUserReviewsByUserToIdOutputDto[]>(
			key,
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

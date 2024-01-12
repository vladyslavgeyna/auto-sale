import { NextFunction, Request, Response } from 'express'
import redisClient from '../../redis'
import carService from './car.service'

class CarController {
	async additionalData(_req: Request, res: Response, next: NextFunction) {
		try {
			const data = await carService.getAdditionalData()

			await redisClient.set('additional-data', data)

			res.json(data)
		} catch (error) {
			next(error)
		}
	}

	getRegions(_req: Request, res: Response, next: NextFunction) {
		try {
			res.json(carService.getRegions())
		} catch (error) {
			next(error)
		}
	}

	getOrderByOptions(_req: Request, res: Response, next: NextFunction) {
		try {
			res.json(carService.getOrderByOptions())
		} catch (error) {
			next(error)
		}
	}
}

export default new CarController()

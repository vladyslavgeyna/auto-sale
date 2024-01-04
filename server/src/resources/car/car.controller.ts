import { NextFunction, Request, Response } from 'express'
import carService from './car.service'

class CarController {
	async additionalData(req: Request, res: Response, next: NextFunction) {
		try {
			const data = await carService.getAdditionalData()

			res.json(data)
		} catch (error) {
			next(error)
		}
	}
}

export default new CarController()

import { NextFunction, Request, Response } from 'express'
import { RequestWithBody } from '../../utils/types/request.type'
import carBrandService from './car-brand.service'

class CarBrandController {
	async getAll(req: Request, res: Response, next: NextFunction) {
		try {
			const carBrands = await carBrandService.getAll()

			res.json(carBrands)
		} catch (error) {
			next(error)
		}
	}

	async create(
		req: RequestWithBody<{ name: string }>,
		res: Response,
		next: NextFunction,
	) {
		try {
			const { name } = req.body

			const carBrand = await carBrandService.create(name)

			res.json(carBrand)
		} catch (error) {
			next(error)
		}
	}
}

export default new CarBrandController()

import { Router } from 'express'
import { additionalDataCache } from './cache/additional-data.cache'
import carController from './car.controller'

const carRouter = Router()

carRouter.get(
	'/additional-data',
	additionalDataCache,
	carController.additionalData,
)

carRouter.get('/regions', carController.getRegions)

carRouter.get('/order-by-options', carController.getOrderByOptions)

export default carRouter

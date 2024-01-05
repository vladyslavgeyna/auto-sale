import { Router } from 'express'
import { getAllCache } from './cache/get-all.cache'
import carModelController from './car-model.controller'

const carModelRouter = Router()

carModelRouter.get('/', getAllCache, carModelController.getAll)

export default carModelRouter

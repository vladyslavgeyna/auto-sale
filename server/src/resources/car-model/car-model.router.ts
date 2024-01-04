import { Router } from 'express'
import carModelController from './car-model.controller'

const carModelRouter = Router()

carModelRouter.get('/', carModelController.getAll)

export default carModelRouter

import { Router } from 'express'
import carController from './car.controller'

const carRouter = Router()

carRouter.get('/additional-data', carController.additionalData)

export default carRouter

import { Router } from 'express'
import userController from './user.controller'

const userRouter = Router()

userRouter.get('/:id', userController.getById)

export default userRouter

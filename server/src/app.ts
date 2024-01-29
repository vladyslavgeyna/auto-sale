import cookieParser from 'cookie-parser'
import cors from 'cors'
import express from 'express'
import session from 'express-session'
import passport from 'passport'
import { appDataSource } from './data-source'
import errorMiddleware from './middlewares/error.middleware'
import accountRouter from './resources/account/account.router'
import carAdRouter from './resources/car-ad/car-ad.router'
import carBrandRouter from './resources/car-brand/car-brand.router'
import carComparisonRouter from './resources/car-comparison/car-comparison.router'
import carModelRouter from './resources/car-model/car-model.router'
import carRouter from './resources/car/car.router'
import conversationRouter from './resources/conversation/conversation.router'
import favoriteAdRouter from './resources/favorite-ad/favorite-ad.router'
import messageRouter from './resources/message/message.router'
import userReviewRouter from './resources/user-review/user-review.router'

class App {
	private port: number
	private app: express.Application
	private URI_PREFIX: string = 'api'

	constructor(port: number) {
		this.port = port
		this.app = express()

		this.initializeMiddlewares()
		this.initializeRoutes()
		this.initializeErrorHandling()
	}

	private getRouteUri(resourceName: string) {
		return `/${this.URI_PREFIX}/${resourceName}`
	}

	private initializeRoutes() {
		this.app.use(this.getRouteUri('account'), accountRouter)
		this.app.use(this.getRouteUri('car-ads'), carAdRouter)
		this.app.use(this.getRouteUri('cars'), carRouter)
		this.app.use(this.getRouteUri('car-models'), carModelRouter)
		this.app.use(this.getRouteUri('car-brands'), carBrandRouter)
		this.app.use(this.getRouteUri('car-comparisons'), carComparisonRouter)
		this.app.use(this.getRouteUri('favorite-ads'), favoriteAdRouter)
		this.app.use(this.getRouteUri('conversations'), conversationRouter)
		this.app.use(this.getRouteUri('messages'), messageRouter)
		this.app.use(this.getRouteUri('user-reviews'), userReviewRouter)
	}

	private initializeMiddlewares() {
		this.app.use(cookieParser())
		this.app.use(express.json())
		this.app.use(
			session({
				secret: String(process.env.SESSION_SECRET),
				resave: false,
				saveUninitialized: true,
			}),
		)
		this.app.use(passport.initialize())
		this.app.use(passport.session())
		this.app.use(
			cors({
				credentials: true,
				origin: process.env.CLIENT_URL,
			}),
		)
	}

	private initializeErrorHandling() {
		this.app.use(errorMiddleware)
	}

	public async start() {
		try {
			await appDataSource.initialize()

			this.app.listen(this.port, () => {
				console.log(`Server started on port ${this.port}`)
			})
		} catch (error) {
			console.log(error)
		}
	}
}

export default App

import cookieParser from 'cookie-parser'
import cors from 'cors'
import express from 'express'
import { appDataSource } from './data-source'
import errorMiddleware from './middlewares/error.middleware'
import accountRouter from './resources/account/account.router'

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
	}

	private initializeMiddlewares() {
		this.app.use(cookieParser())
		this.app.use(express.json())
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

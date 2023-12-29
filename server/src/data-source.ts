import dotenv from 'dotenv'
import { DataSource } from 'typeorm'

dotenv.config()

export const appDataSource = new DataSource({
	type: 'postgres',
	host: 'localhost',
	port: Number(process.env.POSTGRES_PORT) || 5432,
	username: process.env.POSTGRES_USER || 'postgres',
	password: process.env.POSTGRES_PASSWORD || 'postgres',
	database: process.env.POSTGRES_DB || 'auto-sale',
	synchronize: true,
	logging: false,
	entities: [__dirname + '/**/*.entity.{js,ts}'],
	migrations: [],
	subscribers: [],
})

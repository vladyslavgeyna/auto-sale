import { Redis as IORedis } from 'ioredis'

/**
 * Redis singleton class to create a single connection to Redis
 */
class Redis {
	private static instance: Redis
	public redis: IORedis

	private constructor() {
		this.redis = new IORedis(
			Number(process.env.REDIS_PORT),
			String(process.env.REDIS_HOST),
		)
	}

	public static getInstance(): Redis {
		if (!Redis.instance) {
			Redis.instance = new Redis()
		}
		return Redis.instance
	}
}

/**
 * RedisClient class to perform Redis operations. Under the hood, it uses the Redis singleton class
 */
class RedisClient {
	private redis: IORedis

	constructor() {
		this.redis = Redis.getInstance().redis
	}

	public constructKey(
		mainKey: string,
		mainId?: number | string,
		subKey?: string,
		subId?: number | string,
	) {
		let key = mainKey
		if (mainId) {
			key += `:${mainId}`
		}
		if (subKey) {
			key += `/${subKey}`
		}
		if (subId && subKey) {
			key += `:${subId}`
		}

		return key
	}

	public constructKeyFromQuery<T extends object>(
		mainKey: string,
		queryParams: T,
	) {
		let paramsUrl = ''

		for (const key in queryParams) {
			if (key in queryParams) {
				if (queryParams[key as keyof T]) {
					paramsUrl += `${key}:${queryParams[key as keyof T]}/`
				}
			}
		}

		return mainKey + '/' + paramsUrl
	}

	public async getString(key: string): Promise<string | null> {
		const data = await this.redis.get(key)
		return data
	}

	public async get<T>(key: string): Promise<T | null> {
		const data = await this.redis.get(key)
		return data ? (JSON.parse(data) as T) : null
	}

	public async setString(key: string, value: string, expire: number = 60) {
		await this.redis.set(key, value, 'EX', expire)
	}

	public async set<T>(key: string, value: T, expire: number = 60) {
		const data = JSON.stringify(value)
		await this.redis.set(key, data, 'EX', expire)
	}

	public async delete(key: string) {
		await this.redis.del(key)
	}
}

export default new RedisClient()

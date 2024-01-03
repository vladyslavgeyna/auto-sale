import 'express-serve-static-core'
import TokenPayloadDto from './src/resources/token/dtos/token-payload.dto'

declare module 'express-serve-static-core' {
	interface Request {
		authUser?: TokenPayloadDto
	}
}

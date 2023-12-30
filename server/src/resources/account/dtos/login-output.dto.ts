import GenerateTokensOutputDto from '../../token/dtos/generate-tokens-output.dto'
import UserDto from '../../user/dtos/user.dto'

export default interface LoginOutputDto {
	user: UserDto
	tokens: GenerateTokensOutputDto
}

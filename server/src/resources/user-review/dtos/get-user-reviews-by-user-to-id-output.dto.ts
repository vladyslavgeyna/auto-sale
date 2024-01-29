import UserDto from '../../user/dtos/user.dto'
import UserReviewDto from './user-review.dto'

export default interface GetUserReviewsByUserToIdOutputDto
	extends Omit<Omit<UserReviewDto, 'userToId'>, 'userFromId'> {
	userFrom: UserDto
}

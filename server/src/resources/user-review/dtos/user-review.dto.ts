import CreateUserReviewInputDto from './create-user-review-input.dto'

export default interface UserReviewDto extends CreateUserReviewInputDto {
	dateOfCreation: string
	id: number
}

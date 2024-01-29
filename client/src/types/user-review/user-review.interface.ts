import ICreateUserReviewInput from './create-user-review-input.interface'

export default interface IUserReview extends ICreateUserReviewInput {
	dateOfCreation: string
	id: number
}

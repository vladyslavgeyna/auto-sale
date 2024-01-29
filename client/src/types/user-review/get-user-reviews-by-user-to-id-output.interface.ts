import { IUser } from '../user/user.interface'

export default interface IGetUserReviewsByUserToIdOutput {
	dateOfCreation: string
	userFrom: IUser
	text: string
	title: string
	id: number
}

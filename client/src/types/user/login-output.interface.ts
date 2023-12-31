import { IUser } from './user.interface'

export interface ILoginOutput extends IUser {
	accessToken: string
}

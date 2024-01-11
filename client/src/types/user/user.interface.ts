import { UserRole } from './user-role.interface'
export interface IUser {
	id: string
	email: string
	name: string
	surname: string
	phone: string | null
	imageLink: string | null
	role: UserRole
}

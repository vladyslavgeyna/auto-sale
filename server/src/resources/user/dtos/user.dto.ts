import UserRole from '../user-role.enum'

/**
 * Represents user. Includes only the most important and necessary fields
 */
export default interface UserDto {
	id: string
	email: string
	name: string
	surname: string
	phone: string | null
	imageLink: string | null
	role: UserRole
}

import UserRole from '../../user/user-role.enum'

/**
 * Represents yser's data that is stored in JWT payload
 */
export default interface TokenPayloadDto {
	/**
	 * User's id
	 */
	id: string

	/**
	 * User's email address
	 */
	email: string

	/**
	 * User's phone number
	 */
	phone: string

	/**
	 * User's role
	 */
	role: UserRole
}

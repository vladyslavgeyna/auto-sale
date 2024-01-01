/**
 * Represents user. Includes only the most important and necessary fields
 */
export default interface UserDto {
	id: string
	email: string
	name: string
	surname: string
	phone: string | null
	imageName: string | null
}

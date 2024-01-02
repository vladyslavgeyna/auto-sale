export interface IEditProfileInput {
	name: string
	surname: string
	phone?: string
	email: string
	image: FileList | null
}

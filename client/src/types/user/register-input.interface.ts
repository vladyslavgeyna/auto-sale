export interface IRegisterInput {
	name: string
	surname: string
	phone: string
	email: string
	password: string
	passwordConfirm: string
	image: FileList | null
}

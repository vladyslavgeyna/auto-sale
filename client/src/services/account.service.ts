import { api, authApi, credentialsApi } from '@/http/index'
import { IEditProfileInput } from '@/types/user/edit-profile-input.interface'
import { ILoginInput } from '@/types/user/login-input.interface'
import { ILoginOutput } from '@/types/user/login-output.interface'
import { IRegisterInput } from '@/types/user/register-input.interface'
import { IUser } from '@/types/user/user.interface'

class AccountService {
	private URI_PREFIX = '/account'

	refresh = async () => {
		return credentialsApi.get<ILoginOutput>(`${this.URI_PREFIX}/refresh`)
	}

	register = async (userData: IRegisterInput) => {
		const formData = new FormData()

		if (userData.image && userData.image.length) {
			formData.append('image', userData.image[0])
		}

		if (userData.phone) {
			formData.append('phone', userData.phone)
		}

		formData.append('name', userData.name)
		formData.append('surname', userData.surname)
		formData.append('email', userData.email)
		formData.append('password', userData.password)
		formData.append('passwordConfirm', userData.passwordConfirm)

		return api.post<IUser>(`${this.URI_PREFIX}/register`, formData, {
			headers: { 'Content-Type': 'multipart/form-data' },
		})
	}

	login = async (userData: ILoginInput) => {
		return credentialsApi.post<ILoginOutput>(`${this.URI_PREFIX}/login`, {
			...userData,
		})
	}

	logout = async () => {
		return credentialsApi.post(`${this.URI_PREFIX}/logout`)
	}

	edit = async (
		userData: Omit<Omit<IEditProfileInput, 'image'>, 'email'> & {
			image?: File | null
		},
	) => {
		const formData = new FormData()

		if (userData.image) {
			formData.append('image', userData.image)
		}

		if (userData.phone) {
			formData.append('phone', userData.phone)
		}

		formData.append('name', userData.name)
		formData.append('surname', userData.surname)

		return authApi.put<IUser>(`${this.URI_PREFIX}/user`, formData, {
			headers: { 'Content-Type': 'multipart/form-data' },
		})
	}
}

export default new AccountService()

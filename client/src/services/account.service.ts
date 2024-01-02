import { api, credentialsApi } from '@/http/index'
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
		console.log('userData', userData)

		const formData = new FormData()

		if (userData?.image && userData?.image.length) {
			formData.append('image', userData.image[0])
		}

		if (userData?.phone) {
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
}

export default new AccountService()

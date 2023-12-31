import { api } from '@/http/index'
import { ILoginInput } from '@/types/user/login-input.interface'
import { ILoginOutput } from '@/types/user/login-output.interface'
import { IRegisterInput } from '@/types/user/register-input.interface'
import { IUser } from '@/types/user/user.interface'

class AccountService {
	private URI_PREFIX = '/account'

	register = async (userData: IRegisterInput) => {
		const formData = new FormData()

		if (userData?.image && userData?.image.length) {
			formData.append('image', userData.image[0])
		}

		formData.append('name', userData.name)
		formData.append('surname', userData.surname)
		formData.append('email', userData.email)
		formData.append('password', userData.password)
		formData.append('passwordConfirm', userData.passwordConfirm)
		formData.append('phone', userData.phone)

		return api.post<IUser>(`${this.URI_PREFIX}/register`, formData, {
			headers: { 'Content-Type': 'multipart/form-data' },
		})
	}

	login = async (userData: ILoginInput) => {
		return api.post<ILoginOutput>(`${this.URI_PREFIX}/login`, {
			...userData,
		})
	}
}

export default new AccountService()

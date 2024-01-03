import accountService from '@/services/account.service'
import { useUserStore } from '@/store/user'
import { IEditProfileInput } from '@/types/user/edit-profile-input.interface'
import { useMutation } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { useShallow } from 'zustand/react/shallow'

export const useEditProfile = (
	handleHttpError: (error: AxiosError) => void,
	resetForm: (userData: IEditProfileInput) => void,
	resetImage: () => void,
) => {
	const { setUser } = useUserStore(
		useShallow(state => ({
			setUser: state.setUser,
		})),
	)

	return useMutation({
		mutationKey: ['edit-profile'],
		mutationFn: accountService.edit,
		onSuccess: ({ data }) => {
			resetImage()
			resetForm({
				email: data.email,
				phone: data.phone || '',
				name: data.name,
				surname: data.surname,
				image: null,
			})
			setUser(data)
		},
		onError: (error: AxiosError) => {
			handleHttpError(error)
		},
	})
}

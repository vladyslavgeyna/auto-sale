import carAdService from '@/services/car-ad.service'
import { useUserStore } from '@/store/user'
import { IHttpError } from '@/types/http-error.interface'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { useShallow } from 'zustand/react/shallow'
import { useErrorToast } from './useErrorToast'
import { useSuccessToast } from './useSuccessToast'

export const useToggleCarAdActive = (carAdId: number) => {
	const { errorToast } = useErrorToast()
	const { successToast } = useSuccessToast()
	const queryClient = useQueryClient()
	const { user } = useUserStore(
		useShallow(state => ({
			user: state.user,
		})),
	)

	return useMutation({
		mutationKey: ['toggle-car-ad-active', carAdId],
		mutationFn: carAdService.toggleActive,
		onSuccess: async ({ data }) => {
			successToast(
				`The ad is ${
					data.isActivated ? 'activated' : 'deactivated'
				} successfully!`,
			)
			const currentUserId = user?.id!
			await queryClient.invalidateQueries({
				queryKey: ['user-car-ads', currentUserId],
			})
			await queryClient.invalidateQueries({
				queryKey: ['car-ads', carAdId],
			})
		},
		onError: (error: AxiosError) => {
			const httpError = IHttpError.toIHttpError(error)
			errorToast(httpError)
		},
	})
}

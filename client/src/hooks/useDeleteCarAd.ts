import carAdService from '@/services/car-ad.service'
import { useUserStore } from '@/store/user'
import { IHttpError } from '@/types/http-error.interface'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { useShallow } from 'zustand/react/shallow'
import { useErrorToast } from './useErrorToast'
import { useSuccessToast } from './useSuccessToast'

export const useDeleteCarAd = (carAdId: number) => {
	const { errorToast } = useErrorToast()
	const { successToast } = useSuccessToast()
	const queryClient = useQueryClient()
	const { user } = useUserStore(
		useShallow(state => ({
			user: state.user,
		})),
	)

	return useMutation({
		mutationKey: ['delete-car-ad', carAdId],
		mutationFn: carAdService.delete,
		onSuccess: () => {
			successToast(`The ad is deleted successfully!`)
			const currentUserId = user?.id!
			queryClient.invalidateQueries({
				queryKey: ['user-car-ads', currentUserId],
			})
		},
		onError: (error: AxiosError) => {
			const httpError = IHttpError.toIHttpError(error)
			errorToast(httpError)
		},
	})
}

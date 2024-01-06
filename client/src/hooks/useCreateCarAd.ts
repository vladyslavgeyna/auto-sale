import carAdService from '@/services/car-ad.service'
import { IHttpError } from '@/types/http-error.interface'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { useErrorToast } from './useErrorToast'
import { useSuccessToast } from './useSuccessToast'

export const useCreateCarAd = (resetForm: () => void) => {
	const { errorToast } = useErrorToast()
	const { successToast } = useSuccessToast()
	const queryClient = useQueryClient()

	return useMutation({
		mutationKey: ['create-car-ad'],
		mutationFn: carAdService.create,
		onSuccess: () => {
			resetForm()
			successToast('The ad is created successfully!')
			queryClient.invalidateQueries({ queryKey: ['car-ads'] })
		},
		onError: (error: AxiosError) => {
			const httpError = IHttpError.toIHttpError(error)
			errorToast(httpError)
		},
	})
}

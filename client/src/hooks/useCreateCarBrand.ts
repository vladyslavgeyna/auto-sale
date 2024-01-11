import carBrandService from '@/services/car-brand.service'
import { IHttpError } from '@/types/http-error.interface'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { useErrorToast } from './useErrorToast'
import { useSuccessToast } from './useSuccessToast'

export const useCreateCarBrand = (reset: () => void) => {
	const { errorToast } = useErrorToast()
	const { successToast } = useSuccessToast()
	const queryClient = useQueryClient()

	return useMutation({
		mutationKey: ['create-car-brand'],
		mutationFn: carBrandService.create,
		onSuccess: async ({ data }) => {
			successToast(`Car brand is created successfully!`)
			reset()
			// await queryClient.invalidateQueries({
			// 	queryKey: ['favorite-ads'],
			// })
			// await queryClient.invalidateQueries({
			// 	queryKey: ['favorite-ad-exists', carAdId],
			// })
			// await queryClient.invalidateQueries({
			// 	queryKey: ['favorite-ad-count', carAdId],
			// })
		},
		onError: (error: AxiosError) => {
			const httpError = IHttpError.toIHttpError(error)
			errorToast(httpError)
		},
	})
}

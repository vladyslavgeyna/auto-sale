import carModelService from '@/services/car-model.service'
import { IHttpError } from '@/types/http-error.interface'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { useErrorToast } from './useErrorToast'
import { useSuccessToast } from './useSuccessToast'

export const useCreateCarModel = (reset: () => void) => {
	const { errorToast } = useErrorToast()
	const { successToast } = useSuccessToast()
	const queryClient = useQueryClient()

	return useMutation({
		mutationKey: ['create-car-model'],
		mutationFn: carModelService.create,
		onSuccess: async () => {
			successToast(`Car model is created successfully!`)
			reset()
		},
		onError: (error: AxiosError) => {
			const httpError = IHttpError.toIHttpError(error)
			errorToast(httpError)
		},
	})
}

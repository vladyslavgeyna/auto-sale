import carComparisonService from '@/services/car-comparison.service'
import { IHttpError } from '@/types/http-error.interface'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { useErrorToast } from './useErrorToast'
import { useSuccessToast } from './useSuccessToast'

export const useToggleCarComparison = (carAdId: number) => {
	const { errorToast } = useErrorToast()
	const { successToast } = useSuccessToast()
	const queryClient = useQueryClient()

	return useMutation({
		mutationKey: ['toggle-car-comparison'],
		mutationFn: carComparisonService.toggle,
		onSuccess: ({ data }) => {
			successToast(
				`The ad is ${data.added ? 'added' : 'removed'} successfully!`,
			)
			queryClient.invalidateQueries({
				queryKey: ['car-comparison-exists', carAdId],
			})
		},
		onError: (error: AxiosError) => {
			const httpError = IHttpError.toIHttpError(error)
			errorToast(httpError)
		},
	})
}

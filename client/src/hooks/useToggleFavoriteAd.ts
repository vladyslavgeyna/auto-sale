import favoriteAdService from '@/services/favorite-ad.service'
import { IHttpError } from '@/types/http-error.interface'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { useErrorToast } from './useErrorToast'
import { useSuccessToast } from './useSuccessToast'

export const useToggleFavoriteAd = (carAdId: number) => {
	const { errorToast } = useErrorToast()
	const { successToast } = useSuccessToast()
	const queryClient = useQueryClient()

	return useMutation({
		mutationKey: ['toggle-favorite-ad', carAdId],
		mutationFn: favoriteAdService.toggle,
		onSuccess: ({ data }) => {
			successToast(
				`The ad is ${data.added ? 'added' : 'removed'} successfully!`,
			)
			queryClient.invalidateQueries({
				queryKey: ['favorite-ads'],
			})
			queryClient.invalidateQueries({
				queryKey: ['favorite-ad-exists', carAdId],
			})
			queryClient.invalidateQueries({
				queryKey: ['favorite-ad-count', carAdId],
			})
		},
		onError: (error: AxiosError) => {
			const httpError = IHttpError.toIHttpError(error)
			errorToast(httpError)
		},
	})
}

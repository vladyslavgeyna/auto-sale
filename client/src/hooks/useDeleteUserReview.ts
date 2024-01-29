import userReviewService from '@/services/user-review.service'
import { IHttpError } from '@/types/http-error.interface'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { useErrorToast } from './useErrorToast'
import { useSuccessToast } from './useSuccessToast'

export const useDeleteUserReview = (userReviewId: number, userToId: string) => {
	const { errorToast } = useErrorToast()
	const { successToast } = useSuccessToast()
	const queryClient = useQueryClient()

	return useMutation({
		mutationKey: ['delete-user-review', userReviewId],
		mutationFn: userReviewService.delete,
		onSuccess: async () => {
			successToast(`The review is deleted successfully!`)
			await queryClient.invalidateQueries({
				queryKey: ['user-reviews', userToId],
			})
		},
		onError: (error: AxiosError) => {
			const httpError = IHttpError.toIHttpError(error)
			errorToast(httpError)
		},
	})
}

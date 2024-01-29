import userReviewService from '@/services/user-review.service'
import { IHttpError } from '@/types/http-error.interface'
import { IUser } from '@/types/user/user.interface'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { useErrorToast } from './useErrorToast'
import { useSuccessToast } from './useSuccessToast'

export const useCreateUserReview = (userTo: IUser, resetForm: () => void) => {
	const { errorToast } = useErrorToast()
	const { successToast } = useSuccessToast()
	const queryClient = useQueryClient()

	return useMutation({
		mutationKey: ['create-car-ad'],
		mutationFn: userReviewService.create,
		onSuccess: async () => {
			resetForm()
			successToast(
				`Review about ${userTo.name} ${userTo.surname} was successfully created!`,
			)
			//await queryClient.invalidateQueries({ queryKey: ['car-ads'] })
		},
		onError: (error: AxiosError) => {
			const httpError = IHttpError.toIHttpError(error)
			errorToast(httpError)
		},
	})
}

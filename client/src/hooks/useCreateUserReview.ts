import userReviewService from '@/services/user-review.service'
import { IHttpError } from '@/types/http-error.interface'
import { IUser } from '@/types/user/user.interface'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { useRouter } from 'next/navigation'
import { useErrorToast } from './useErrorToast'
import { useSuccessToast } from './useSuccessToast'

export const useCreateUserReview = (userTo: IUser, resetForm: () => void) => {
	const { errorToast } = useErrorToast()
	const { successToast } = useSuccessToast()
	const queryClient = useQueryClient()
	const router = useRouter()

	return useMutation({
		mutationKey: ['create-user-review'],
		mutationFn: userReviewService.create,
		onSuccess: async () => {
			resetForm()
			successToast(
				`Review about ${userTo.name} ${userTo.surname} was successfully created!`,
			)
			await queryClient.invalidateQueries({
				queryKey: ['user-reviews', userTo.id],
			})
			router.push(`/user-review/${userTo.id}`)
		},
		onError: (error: AxiosError) => {
			const httpError = IHttpError.toIHttpError(error)
			errorToast(httpError)
		},
	})
}

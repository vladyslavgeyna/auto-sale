import { useToast } from '@/components/ui/useToast'
import carAdService from '@/services/car-ad.service'
import { useMutation } from '@tanstack/react-query'
import { AxiosError } from 'axios'

export const useCreateCarAd = (
	handleHttpError: (error: AxiosError) => void,
	resetForm: () => void,
) => {
	const { toast } = useToast()

	return useMutation({
		mutationKey: ['create-car-ad'],
		mutationFn: carAdService.create,
		onSuccess: () => {
			resetForm()
			toast({
				variant: 'success',
				description: 'Car ad is created successfully!',
			})
		},
		onError: (error: AxiosError) => {
			handleHttpError(error)
		},
	})
}

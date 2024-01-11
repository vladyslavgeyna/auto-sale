import { useToast } from '@/components/ui/useToast'
import { IHttpError } from '@/types/http-error.interface'
import { redirect, useRouter } from 'next/navigation'

export const useErrorToast = () => {
	const { toast } = useToast()

	const router = useRouter()

	const errorToast = (error: IHttpError | null) => {
		if (!error) {
			redirect('/error')
		}

		const errorDescription =
			error.errors.length > 0 ? (
				<ul>
					{error.errors.map((error, index) => {
						return <li key={index}>{error}</li>
					})}
				</ul>
			) : undefined

		return toast({
			variant: 'destructive',
			title: error.message,
			description: errorDescription,
		})
	}

	return { errorToast }
}

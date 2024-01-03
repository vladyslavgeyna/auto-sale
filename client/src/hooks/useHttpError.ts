import { IHttpError } from '@/types/http-error.interface'
import { AxiosError } from 'axios'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export const useHttpError = () => {
	const [httpError, setHttpError] = useState<IHttpError | null>(null)

	const router = useRouter()

	const handleHttpError = (error: AxiosError) => {
		const errorData = error.response?.data

		if (
			IHttpError.isHttpError(errorData) &&
			IHttpError.isClientError(error)
		) {
			setHttpError(errorData)
		} else {
			router.push('/error')
		}
	}

	return { httpError, handleHttpError }
}

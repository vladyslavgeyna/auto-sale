import { IHttpError } from '@/types/http-error.interface'
import { AxiosError } from 'axios'
import { redirect } from 'next/navigation'
import Forbidden from '../forbidden/Forbidden'
import NotFound from '../not-found/NotFound'

const ComplexError = ({ error }: { error: Error | null }) => {
	if (error) {
		const axiosError = error as AxiosError
		const httpError = IHttpError.toIHttpError(axiosError)
		if (!httpError) {
			redirect('/error')
		}
		if (httpError.status === 404) {
			return <NotFound text={httpError.message} />
		} else if (httpError.status === 403) {
			return <Forbidden text={httpError.message} />
		} else {
			redirect('/error')
		}
	} else {
		redirect('/error')
	}
}

export default ComplexError

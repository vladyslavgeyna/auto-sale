import ServerError from '@/components/server-error/ServerError'
import { Metadata } from 'next'

export const metadata: Metadata = {
	title: 'Auto Sale | Error',
	description: 'Server error page',
}

const Error = () => {
	return <ServerError />
}

export default Error

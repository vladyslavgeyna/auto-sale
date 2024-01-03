import { IHttpError } from '@/types/http-error.interface'
import { Card } from '../ui/card'

type PropsType = {
	httpError: IHttpError
	className?: string
}

const IHttpError = ({ httpError, className = '' }: PropsType) => {
	return (
		<Card className={'text-center p-2 ' + className}>
			<div className='font-bold text-lg'>{httpError.message}</div>
			{httpError.errors.length > 0 && (
				<ul className='list-disc list-inside'>
					{httpError.errors.map((error, index) => (
						<li key={index}>{error}</li>
					))}
				</ul>
			)}
		</Card>
	)
}

export default IHttpError

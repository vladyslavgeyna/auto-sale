type PropsType = {
	message?: string
	className?: string
}

const FormError = ({ message, className = '' }: PropsType) => {
	return message ? (
		<div className={'text-red-600 text-sm ' + className}>{message}</div>
	) : null
}

export default FormError

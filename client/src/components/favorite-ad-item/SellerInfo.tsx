type PropsType = {
	name: string
	phone: string | null
	surname: string
	email: string
}

const SellerInfo = ({ email, name, phone, surname }: PropsType) => {
	return (
		<div className='text-sm flex flex-col items-start gap-0.5 text-slate-500 self-start sm:self-stretch'>
			<div>
				{name} {surname}
			</div>
			{phone && (
				<a
					className='hover:scale-[1.03] transition-all duration-300'
					href={`tel:+38${phone}`}>
					{phone}
				</a>
			)}
			<a
				className='hover:scale-[1.03] transition-all duration-300'
				href={`mailto:${email}`}>
				{email}
			</a>
		</div>
	)
}

export default SellerInfo

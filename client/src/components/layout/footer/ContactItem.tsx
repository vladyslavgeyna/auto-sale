type PropsType = {
	iconComponent: React.ReactNode
	link: string
}

const ContactItem = ({ iconComponent, link }: PropsType) => {
	return (
		<li className='hover:scale-125 transition-all duration-300'>
			<a target='_blank' href={link}>
				{iconComponent}
			</a>
		</li>
	)
}

export default ContactItem

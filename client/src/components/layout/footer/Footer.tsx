import Link from 'next/link'
import ContactList from './ContactList'

const Footer = () => {
	return (
		<footer className='container max-w-screen-2xl py-3'>
			<div className='flex justify-between items-center'>
				<div>
					<span>
						© {new Date().getFullYear()}{' '}
						<Link className='hover:underline' href={'/'}>
							Auto Sale
						</Link>{' '}
						by{' '}
						<a
							target='_blank'
							href='https://github.com/vladyslavgeyna'>
							<strong className='hover:underline'>
								Vladyslav Geyna
							</strong>
						</a>
					</span>
				</div>
				<ContactList />
			</div>
		</footer>
	)
}

export default Footer

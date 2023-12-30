import Link from 'next/link'
import { BsFacebook, BsInstagram, BsTelegram } from 'react-icons/bs'

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
				<ul className='flex items-center text-xl gap-2'>
					<li>
						<a target='_blank' href='https://t.me/what_is_lovechik'>
							<BsTelegram />
						</a>
					</li>
					<li>
						<a
							target='_blank'
							href='https://www.instagram.com/_what_is_lovechik_/'>
							<BsInstagram />
						</a>
					</li>
					<li>
						<a
							target='_blank'
							href='https://www.facebook.com/profile.php?id=100072210826751'>
							<BsFacebook />
						</a>
					</li>
				</ul>
			</div>
		</footer>
	)
}

export default Footer

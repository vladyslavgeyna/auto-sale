import Link from 'next/link'
import ButtonsGroup from './ButtonsGroup'

const Header = () => {
	return (
		<header className='header fixed top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60'>
			<div className='container flex h-14 max-w-screen-2xl items-center justify-between'>
				<div>
					<Link
						className='font-black text-xl relative z-40'
						href={'/'}>
						Auto Sale
					</Link>
				</div>
				<div>
					<ButtonsGroup />
				</div>
			</div>
		</header>
	)
}

export default Header

import { usePathname, useSearchParams } from 'next/navigation'
import { useEffect } from 'react'

type PropsType = {
	open: boolean
	buttonsGroup: React.ReactNode
	setMenuOpen: (open: boolean) => void
}

const Menu = ({ open, buttonsGroup, setMenuOpen }: PropsType) => {
	const translate = open ? 'translate-x-0' : '-translate-x-full'
	const pathname = usePathname()
	const searchParams = useSearchParams()

	useEffect(() => {
		document.body.style.overflow = open ? 'hidden' : 'auto'

		return () => {
			document.body.style.overflow = 'auto'
		}
	}, [open])

	useEffect(() => {
		if (open) {
			setMenuOpen(false)
		}
	}, [pathname, searchParams])

	return (
		<div
			className={
				'fixed burgerMenu w-screen h-screen left-0 top-0 pt-[57px] md:hidden block transition-all duration-300 ' +
				translate
			}>
			<div className='p-3 overflow-auto bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/95 h-full w-full'>
				<div className='flex flex-col gap-3 max-w-96 m-auto'>
					{buttonsGroup}
				</div>
			</div>
		</div>
	)
}

export default Menu

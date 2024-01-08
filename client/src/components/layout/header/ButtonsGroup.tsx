'use client'
import { useUserStore } from '@/store/user'
import { useState } from 'react'
import {
	BsFillPersonCheckFill,
	BsFillPersonPlusFill,
	BsPlusCircleFill,
} from 'react-icons/bs'
import { FaHeart, FaScaleBalanced } from 'react-icons/fa6'
import { useShallow } from 'zustand/react/shallow'
import ButtonsGroupSkeleton from './ButtonsGroupSkeleton'
import HeaderButton from './HeaderButton'
import Menu from './Menu'
import BurgerMenuIcon from './burger-menu-icon/BurgerMenuIcon'
import DropDownMenu from './drop-down-menu/DropDownMenu'

const ButtonsGroup = () => {
	const { isAuthenticated, isCheckingAuthFinished, isLoading } = useUserStore(
		useShallow(state => ({
			isAuthenticated: state.isAuthenticated,
			isCheckingAuthFinished: state.isCheckingAuthFinished,
			isLoading: state.isLoading,
		})),
	)

	const buttonsGroup =
		isLoading || !isCheckingAuthFinished ? (
			<ButtonsGroupSkeleton />
		) : isAuthenticated ? (
			<>
				<HeaderButton
					href='/car-ad/create'
					iconComponent={<BsPlusCircleFill className='text-lg' />}
					text='Create ad'
				/>
				<HeaderButton
					href='/'
					iconComponent={<FaScaleBalanced className='text-lg' />}
					text='Comparison'
				/>
				<HeaderButton
					href='/favorite-ads'
					iconComponent={<FaHeart className='text-lg' />}
					text='Favorite'
				/>
				<DropDownMenu />
			</>
		) : (
			<>
				<HeaderButton
					href='/account/register'
					iconComponent={<BsFillPersonPlusFill className='text-lg' />}
					text='Sign up'
				/>
				<HeaderButton
					href='/account/login'
					iconComponent={
						<BsFillPersonCheckFill className='text-lg' />
					}
					text='Sign in'
				/>
			</>
		)

	const [isMenuOpen, setIsMenuOpen] = useState(false)

	return (
		<nav className='flex items-center gap-2'>
			<div className='items-center gap-2 hidden md:flex'>
				{buttonsGroup}
			</div>
			<div className='items-center gap-2 md:hidden flex'>
				<BurgerMenuIcon
					onClick={() => setIsMenuOpen(prev => !prev)}
					open={isMenuOpen}
				/>
				<Menu
					setMenuOpen={setIsMenuOpen}
					buttonsGroup={buttonsGroup}
					open={isMenuOpen}
				/>
			</div>
		</nav>
	)
}

export default ButtonsGroup

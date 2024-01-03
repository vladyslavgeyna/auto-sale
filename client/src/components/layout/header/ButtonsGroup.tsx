'use client'
import { useUserStore } from '@/store/user'
import {
	BsFillPersonCheckFill,
	BsFillPersonPlusFill,
	BsPlusCircleFill,
} from 'react-icons/bs'
import { FaHeart, FaScaleBalanced } from 'react-icons/fa6'
import { useShallow } from 'zustand/react/shallow'
import ButtonsGroupSkeleton from './ButtonsGroupSkeleton'
import DropDownMenu from './DropDownMenu/DropDownMenu'
import HeaderButton from './HeaderButton'

const ButtonsGroup = () => {
	const { isAuthenticated, isCheckingAuthFinished, isLoading } = useUserStore(
		useShallow(state => ({
			isAuthenticated: state.isAuthenticated,
			isCheckingAuthFinished: state.isCheckingAuthFinished,
			isLoading: state.isLoading,
		})),
	)

	return (
		<nav className='flex items-center gap-2'>
			{isLoading || !isCheckingAuthFinished ? (
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
						href='/'
						iconComponent={<FaHeart className='text-lg' />}
						text='Favorite'
					/>
					<DropDownMenu />
				</>
			) : (
				<>
					<HeaderButton
						href='/account/register'
						iconComponent={
							<BsFillPersonPlusFill className='text-lg' />
						}
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
			)}
		</nav>
	)
}

export default ButtonsGroup

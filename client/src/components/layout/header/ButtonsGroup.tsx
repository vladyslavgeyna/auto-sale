'use client'
import { useUserStore } from '@/store/user'
import {
	BsBoxArrowRight,
	BsFillPersonCheckFill,
	BsFillPersonPlusFill,
	BsPlusCircleFill,
} from 'react-icons/bs'
import { useShallow } from 'zustand/react/shallow'
import HeaderButton from './HeaderButton'

const ButtonsGroup = () => {
	const { isAuthenticated } = useUserStore(
		useShallow(state => ({
			isAuthenticated: state.isAuthenticated,
		})),
	)

	return (
		<nav className='flex items-center gap-2'>
			{isAuthenticated ? (
				<>
					<HeaderButton
						href='/'
						iconComponent={<BsPlusCircleFill />}
						text='Create ad'
					/>
					<HeaderButton
						href='/'
						iconComponent={<BsBoxArrowRight />}
						text='Log out'
					/>
				</>
			) : (
				<>
					<HeaderButton
						href='/account/register'
						iconComponent={<BsFillPersonPlusFill />}
						text='Sign up'
					/>
					<HeaderButton
						href='/account/login'
						iconComponent={<BsFillPersonCheckFill />}
						text='Sign in'
					/>
				</>
			)}
		</nav>
	)
}

export default ButtonsGroup

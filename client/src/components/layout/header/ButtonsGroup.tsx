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
						iconComponent={<BsPlusCircleFill />}
						text='Create ad'
					/>
					<HeaderButton
						iconComponent={<BsBoxArrowRight />}
						text='Log out'
					/>
				</>
			) : (
				<>
					<HeaderButton
						iconComponent={<BsFillPersonPlusFill />}
						text='Sign up'
					/>
					<HeaderButton
						iconComponent={<BsFillPersonCheckFill />}
						text='Sign in'
					/>
				</>
			)}
		</nav>
	)
}

export default ButtonsGroup

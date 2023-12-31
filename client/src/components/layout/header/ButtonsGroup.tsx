'use client'
import { Button } from '@/components/ui/button'
import accountService from '@/services/account.service'
import { useUserStore } from '@/store/user'
import { useMutation } from '@tanstack/react-query'
import { Loader2 } from 'lucide-react'
import { useRouter } from 'next/navigation'
import {
	BsBoxArrowRight,
	BsFillPersonCheckFill,
	BsFillPersonPlusFill,
	BsPlusCircleFill,
} from 'react-icons/bs'
import { useShallow } from 'zustand/react/shallow'
import ButtonsGroupSkeleton from './ButtonsGroupSkeleton'
import HeaderButton from './HeaderButton'

const ButtonsGroup = () => {
	const {
		isAuthenticated,
		isCheckingAuthFinished,
		isLoading,
		removeCredentials,
	} = useUserStore(
		useShallow(state => ({
			isAuthenticated: state.isAuthenticated,
			isCheckingAuthFinished: state.isCheckingAuthFinished,
			isLoading: state.isLoading,
			removeCredentials: state.removeCredentials,
		})),
	)

	const router = useRouter()

	const { mutate: logout, isPending } = useMutation({
		mutationKey: ['logout'],
		mutationFn: accountService.logout,
		onSuccess: () => {
			removeCredentials()
			router.push('/')
		},
	})

	const handleLogout = () => {
		logout()
	}

	return (
		<nav className='flex items-center gap-2'>
			{isLoading || !isCheckingAuthFinished ? (
				<ButtonsGroupSkeleton />
			) : isAuthenticated ? (
				<>
					<HeaderButton
						href='/'
						iconComponent={<BsPlusCircleFill />}
						text='Create ad'
					/>
					<Button
						onClick={handleLogout}
						className='text-base flex items-center gap-1 w-28'
						type='button'
						variant='default'>
						{!isPending ? (
							<>
								<span>Log out</span>
								<BsBoxArrowRight />
							</>
						) : (
							<Loader2 className='h-6 w-6 animate-spin' />
						)}
					</Button>
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

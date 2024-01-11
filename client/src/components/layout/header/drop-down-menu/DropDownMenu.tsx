'use client'

import {
	ChevronDown,
	LayoutDashboard,
	Loader2,
	LogOut,
	Table,
	User,
} from 'lucide-react'

import { Avatar, AvatarImage } from '@/components/ui/Avatar'
import { Button } from '@/components/ui/Button'
import {
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenu as DropdownMenuShadcn,
	DropdownMenuTrigger,
} from '@/components/ui/DropdownMenu'
import { useLogout } from '@/hooks/useLogout'
import { useUserStore } from '@/store/user'
import Link from 'next/link'
import { useState } from 'react'
import { useShallow } from 'zustand/react/shallow'
import styles from './DropDownMenu.module.css'

function DropdownMenu() {
	const { removeCredentials, user } = useUserStore(
		useShallow(state => ({
			removeCredentials: state.removeCredentials,
			user: state.user,
		})),
	)
	const [isOpened, setIsOpened] = useState(false)

	const { mutate: logout, isPending } = useLogout(removeCredentials)

	const handleLogout = () => {
		logout()
	}

	const onOpenChange = (open: boolean) => {
		setIsOpened(open)
	}

	return (
		<DropdownMenuShadcn open={isOpened} onOpenChange={onOpenChange}>
			<DropdownMenuTrigger asChild>
				<Button
					className={
						'text-base flex items-center gap-2 ' + styles.button
					}
					variant='default'>
					<Avatar className='w-8 h-8'>
						<AvatarImage
							src={user?.imageLink || '/default_avatar.svg'}
							alt='User avatar'
						/>
					</Avatar>
					<ChevronDown className='text-lg' />
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent className='w-56'>
				<DropdownMenuGroup>
					<DropdownMenuItem className='hover:cursor-pointer'>
						<Link
							onClick={() => onOpenChange(false)}
							className='w-full flex items-center'
							href={'/account/profile'}>
							<User className='mr-2 h-4 w-4' />
							<span>Profile</span>
						</Link>
					</DropdownMenuItem>
				</DropdownMenuGroup>
				<DropdownMenuGroup>
					<DropdownMenuItem className='hover:cursor-pointer'>
						<Link
							onClick={() => onOpenChange(false)}
							className='w-full flex items-center'
							href={'/car-ad/my-ads'}>
							<Table className='mr-2 h-4 w-4 -mb-0.5' />
							<span>My ads</span>
						</Link>
					</DropdownMenuItem>
				</DropdownMenuGroup>
				{user && user.role === 'admin' && (
					<>
						<DropdownMenuSeparator />
						<DropdownMenuGroup>
							<DropdownMenuItem className='hover:cursor-pointer'>
								<Link
									onClick={() => onOpenChange(false)}
									className='w-full flex items-center'
									href={'/dashboard'}>
									<LayoutDashboard className='mr-2 h-4 w-4 -mb-0.5' />
									<span>Dashboard</span>
								</Link>
							</DropdownMenuItem>
						</DropdownMenuGroup>
					</>
				)}
				<DropdownMenuSeparator />
				<DropdownMenuGroup>
					<DropdownMenuItem
						onClick={handleLogout}
						className='hover:cursor-pointer'>
						{!isPending ? (
							<>
								<LogOut className='mr-2 h-4 w-4' />
								<span>Log out</span>
							</>
						) : (
							<Loader2 className='h-5 w-5 animate-spin' />
						)}
					</DropdownMenuItem>
				</DropdownMenuGroup>
			</DropdownMenuContent>
		</DropdownMenuShadcn>
	)
}

export default DropdownMenu

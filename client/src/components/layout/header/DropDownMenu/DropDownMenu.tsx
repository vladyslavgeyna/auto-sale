'use client'

import {
	ChevronDown,
	Loader2,
	LogOut,
	Mail,
	MessageSquare,
	PlusCircle,
	User,
	UserPlus,
} from 'lucide-react'

import { Avatar, AvatarImage } from '@/components/ui/Avatar'
import { Button } from '@/components/ui/Button'
import {
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuPortal,
	DropdownMenuSeparator,
	DropdownMenu as DropdownMenuShadcn,
	DropdownMenuSub,
	DropdownMenuSubContent,
	DropdownMenuSubTrigger,
	DropdownMenuTrigger,
} from '@/components/ui/DropdownMenu'
import accountService from '@/services/account.service'
import { useUserStore } from '@/store/user'
import { useMutation } from '@tanstack/react-query'
import Link from 'next/link'
import { redirect } from 'next/navigation'
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

	const { mutate: logout, isPending } = useMutation({
		mutationKey: ['logout'],
		mutationFn: accountService.logout,
		onSuccess: () => {
			removeCredentials()
			redirect('/')
		},
	})

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
				<DropdownMenuSeparator />
				<DropdownMenuGroup>
					<DropdownMenuSub>
						<DropdownMenuSubTrigger>
							<UserPlus className='mr-2 h-4 w-4' />
							<span>Invite users</span>
						</DropdownMenuSubTrigger>
						<DropdownMenuPortal>
							<DropdownMenuSubContent>
								<DropdownMenuItem>
									<Mail className='mr-2 h-4 w-4' />
									<span>Email</span>
								</DropdownMenuItem>
								<DropdownMenuItem>
									<MessageSquare className='mr-2 h-4 w-4' />
									<span>Message</span>
								</DropdownMenuItem>
								<DropdownMenuSeparator />
								<DropdownMenuItem>
									<PlusCircle className='mr-2 h-4 w-4' />
									<span>More...</span>
								</DropdownMenuItem>
							</DropdownMenuSubContent>
						</DropdownMenuPortal>
					</DropdownMenuSub>
				</DropdownMenuGroup>
				<DropdownMenuSeparator />
				<div onClick={handleLogout}>
					<DropdownMenuItem className='hover:cursor-pointer'>
						{!isPending ? (
							<>
								<LogOut className='mr-2 h-4 w-4' />
								<span>Log out</span>
							</>
						) : (
							<Loader2 className='h-5 w-5 animate-spin' />
						)}
					</DropdownMenuItem>
				</div>
			</DropdownMenuContent>
		</DropdownMenuShadcn>
	)
}

export default DropdownMenu

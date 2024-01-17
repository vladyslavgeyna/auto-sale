import { useDeleteConversation } from '@/hooks/useDeleteConversation'
import { useUserStore } from '@/store/user'
import IGetUserConversationsOutput from '@/types/conversation/get-user-conversations-output.interface'
import IMember from '@/types/conversation/member.interface'
import { Loader2 } from 'lucide-react'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import { useEffect, useState } from 'react'
import { MdDelete } from 'react-icons/md'
import { useShallow } from 'zustand/react/shallow'
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from '../ui/AlertDialog'
import { Avatar, AvatarImage } from '../ui/Avatar'
import { Button } from '../ui/Button'

const ConversationItem = ({
	conversation,
}: {
	conversation: IGetUserConversationsOutput
}) => {
	const [member, setMember] = useState<IMember | null>(null)

	const { user } = useUserStore(
		useShallow(state => ({
			user: state.user,
		})),
	)

	if (!user) {
		redirect('/')
	}

	const { mutate: remove, isPending } = useDeleteConversation(
		conversation.id,
		user.id,
	)

	useEffect(() => {
		if (conversation.firstMember.id !== user.id) {
			setMember(conversation.firstMember)
		} else {
			setMember(conversation.secondMember)
		}
	}, [])

	const hasNewMessage = () => {
		if (conversation.lastMessageSenderId !== user.id) {
			if (conversation.lastMessageDateOfCreation) {
				const lastMessageDate = new Date(
					conversation.lastMessageDateOfCreation,
				)

				let lastUserConversationVisit: Date | null

				if (conversation.firstMember.id === user.id) {
					lastUserConversationVisit =
						conversation.lastFirstMemberVisit
							? new Date(conversation.lastFirstMemberVisit)
							: null
				} else {
					lastUserConversationVisit =
						conversation.lastSecondMemberVisit
							? new Date(conversation.lastSecondMemberVisit)
							: null
				}
				if (
					!lastUserConversationVisit ||
					lastMessageDate > lastUserConversationVisit
				) {
					return true
				}
			}
		}
		return false
	}

	const handleDeleteConversation = () => {
		remove(conversation.id)
	}

	return (
		member && (
			<div className='border border-gray-100 rounded-lg hover:bg-gray-100 transition-all  p-1.5 cursor-pointer'>
				<div className='flex justify-between gap-3 items-center'>
					<Link
						href={`/chat/${conversation.id}`}
						className='flex-auto'>
						<div className='flex items-center gap-3 w-full '>
							<div>
								<Avatar className='w-12 h-12'>
									<AvatarImage
										className='object-cover rounded-full w-full h-full'
										src={
											member.imageLink ||
											'/default_avatar.svg'
										}
										alt='User avatar'
									/>
								</Avatar>
							</div>
							<div className='flex-auto font-bold'>
								{member.name} {member.surname}
							</div>
						</div>
					</Link>
					{hasNewMessage() && (
						<span className='rounded-full w-2.5 h-2.5 bg-primary'></span>
					)}
					<AlertDialog>
						<AlertDialogTrigger asChild>
							<Button
								className='text-lg !p-0 w-10 flex items-center justify-center'
								variant={'outline'}
								type='button'>
								{isPending ? (
									<Loader2 className='animate-spin h-6 w-6' />
								) : (
									<MdDelete />
								)}
							</Button>
						</AlertDialogTrigger>
						<AlertDialogContent>
							<AlertDialogCancel className='hover:bg-inherit hover:text-slate-700 border-none absolute top-0 right-0'>
								&#88;
							</AlertDialogCancel>
							<AlertDialogHeader>
								<AlertDialogTitle>
									Are you absolutely sure?
								</AlertDialogTitle>
								<AlertDialogDescription>
									This action cannot be undone. This will
									permanently delete this conversation with
									all messages for you and person you were
									speaking with.
								</AlertDialogDescription>
							</AlertDialogHeader>
							<AlertDialogFooter>
								<AlertDialogCancel>Cancel</AlertDialogCancel>
								<AlertDialogAction
									onClick={handleDeleteConversation}>
									Delete anyway
								</AlertDialogAction>
							</AlertDialogFooter>
						</AlertDialogContent>
					</AlertDialog>
				</div>
			</div>
		)
	)
}

export default ConversationItem

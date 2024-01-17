import { useUserStore } from '@/store/user'
import IGetUserConversationsOutput from '@/types/conversation/get-user-conversations-output.interface'
import IMember from '@/types/conversation/member.interface'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useShallow } from 'zustand/react/shallow'
import { Avatar, AvatarImage } from '../ui/Avatar'

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

	useEffect(() => {
		if (conversation.firstMember.id !== user.id) {
			setMember(conversation.firstMember)
		} else {
			setMember(conversation.secondMember)
		}
	}, [])

	const hasNewMessage = () => {
		if (conversation.lastMessageSenderId !== user.id) {
			if (
				conversation.lastMessageDateOfCreation &&
				conversation.lastMessageDateOfCreation
			) {
				const lastMessageDate = new Date(
					conversation.lastMessageDateOfCreation,
				)
				if (
					conversation.lastFirstMemberVisit &&
					conversation.lastSecondMemberVisit
				) {
					let lastUserConversationVisit: Date

					if (conversation.firstMember.id === user.id) {
						lastUserConversationVisit = new Date(
							conversation.lastFirstMemberVisit,
						)
					} else {
						lastUserConversationVisit = new Date(
							conversation.lastSecondMemberVisit,
						)
					}
					if (lastMessageDate > lastUserConversationVisit) {
						return true
					} else {
						return false
					}
				}
			}
		}
	}

	return (
		member && (
			<Link
				className='border border-gray-100 rounded-lg hover:bg-gray-100 transition-all  p-1.5 cursor-pointer'
				href={`/chat/${conversation.id}`}>
				<div className='flex justify-between gap-3 items-center'>
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
					{hasNewMessage() && (
						<span className='rounded-full w-2.5 h-2.5 bg-primary'></span>
					)}
				</div>
			</Link>
		)
	)
}

export default ConversationItem

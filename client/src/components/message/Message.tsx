import IGetConversationMessagesOutput from '@/types/message/get-conversation-messages-output.interface'
import { IUser } from '@/types/user/user.interface'
import { format } from 'timeago.js'
import { Avatar, AvatarImage } from '../ui/Avatar'

type PropsType = {
	message: IGetConversationMessagesOutput
	currentUser: IUser
}

const Message = ({ message, currentUser }: PropsType) => {
	const users = [message.firstMember, message.secondMember]
	const isOwn = message.senderId === currentUser.id
	const member = users.find(u => u.id !== currentUser.id)
	let imageSrc = isOwn ? currentUser.imageLink : member?.imageLink
	imageSrc = imageSrc || '/default_avatar.svg'

	return (
		<div
			className={
				'flex flex-col mt-5' +
				(isOwn
					? ' items-end [&_p]:bg-gray-200 [&_p]:text-black'
					: ' [&_p]:bg-primary [&_p]:text-white')
			}>
			<div className='flex gap-2'>
				<Avatar className='w-8 h-8'>
					<AvatarImage
						className='object-cover rounded-full w-full h-full'
						src={imageSrc}
						alt='User avatar'
					/>
				</Avatar>
				<p className='p-2 rounded-lg max-w-72 whitespace-pre-wrap break-words'>
					{message.text}
				</p>
			</div>
			<div className='text-sm mt-1'>{format(message.dateOfCreation)}</div>
		</div>
	)
}

export default Message

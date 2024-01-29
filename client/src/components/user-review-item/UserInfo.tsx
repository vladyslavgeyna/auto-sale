import { IUser } from '@/types/user/user.interface'
import { Avatar, AvatarImage } from '../ui/Avatar'

const UserInfo = ({
	user,
	isCurrentUser,
}: {
	user: IUser
	isCurrentUser: boolean
}) => {
	return (
		<div className='flex items-center gap-2'>
			<Avatar className='w-8 h-8'>
				<AvatarImage
					className='object-cover rounded-full'
					src={user?.imageLink || '/default_avatar.svg'}
					alt='User avatar'
				/>
			</Avatar>
			<div className='font-semibold'>
				{user.name} {user.surname} {isCurrentUser && '(You)'}
			</div>
		</div>
	)
}

export default UserInfo

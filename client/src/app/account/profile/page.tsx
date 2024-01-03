import EditProfileForm from '@/components/edit-profile-form/EditProfileForm'
import Title from '@/components/ui/Title'
import RequireAuth from '@/hoc/RequireAuth'
import { Metadata } from 'next'

export const metadata: Metadata = {
	title: 'Auto Sale | Profile',
	description: 'User profile page to edit and view profile data',
}

const Profile = () => {
	return (
		<RequireAuth>
			<div>
				<Title className='text-center'>Profile</Title>
				<EditProfileForm />
			</div>
		</RequireAuth>
	)
}

export default Profile

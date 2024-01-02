import EditProfileForm from '@/components/edit-profile-form/EditProfileForm'
import Title from '@/components/ui/Title'
import RequireAuth from '@/hoc/RequireAuth'

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

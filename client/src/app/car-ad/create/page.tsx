import CreateCarAdForm from '@/components/create-car-ad-form/CreateCarAdForm'
import Title from '@/components/ui/Title'
import RequireAuth from '@/hoc/RequireAuth'

const CreateCarAd = ({}) => {
	return (
		<RequireAuth>
			<div>
				<Title className='text-center'>Create ad</Title>
				<CreateCarAdForm />
			</div>
		</RequireAuth>
	)
}

export default CreateCarAd

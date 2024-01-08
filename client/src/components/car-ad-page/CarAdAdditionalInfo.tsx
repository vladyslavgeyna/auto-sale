import { useGetFavoriteAdCount } from '@/hooks/useGetFavoriteAdCount'
import { Loader2 } from 'lucide-react'
import { redirect } from 'next/navigation'

type PropsType = {
	carAdDateOfCreation: string
	carAdId: number
}

const CarAdAdditionalInfo = ({ carAdDateOfCreation, carAdId }: PropsType) => {
	const {
		data,
		isLoading: isGettingCountLoading,
		isSuccess: isGettingCountSuccess,
		isError: isGettingCountError,
	} = useGetFavoriteAdCount(carAdId)

	if (
		!isGettingCountLoading &&
		(!isGettingCountSuccess || isGettingCountError)
	) {
		redirect('/error')
	}

	return (
		<>
			<div className='text-sm mt-3'>
				The ad has been created at:{' '}
				<strong>{carAdDateOfCreation}</strong>
			</div>
			<div className='text-sm mt-3 flex items-center gap-1'>
				Saved to favorites:{' '}
				{isGettingCountLoading ? (
					<Loader2 className='h-4 w-4 animate-spin' />
				) : (
					<strong>{data?.count || 0}</strong>
				)}
			</div>
		</>
	)
}

export default CarAdAdditionalInfo

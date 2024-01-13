import { useUserStore } from '@/store/user'
import { IGetCarAdByIdOutput } from '@/types/car-ad/get-car-ad-by-id-output.interface'
import { AvatarImage } from '@radix-ui/react-avatar'
import { Terminal } from 'lucide-react'
import { useShallow } from 'zustand/react/shallow'
import { Alert, AlertTitle } from '../ui/Alert'
import { Avatar } from '../ui/Avatar'
import Title from '../ui/Title'
import AboutCar from './AboutCar'
import ActionLinks from './ActionLinks'
import CarAdAdditionalInfo from './CarAdAdditionalInfo'
import Heart from './Heart'
import SellerInfo from './SellerInfo'
import Slider from './slider/Slider'

const CarAdPage = ({ carAd }: { carAd: IGetCarAdByIdOutput }) => {
	const { user, isAuthenticated } = useUserStore(
		useShallow(state => ({
			user: state.user,
			isAuthenticated: state.isAuthenticated,
		})),
	)

	const isUserAuthenticatedAndNotUserAd =
		isAuthenticated && user?.id !== carAd.userId

	return (
		<div className='mt-7'>
			{!carAd.isActive && (
				<Alert className='mb-3'>
					<Terminal className='h-4 w-4' />
					<AlertTitle>
						The is deactivated. Other users can't see it.
					</AlertTitle>
				</Alert>
			)}
			<div className='flex items-center gap-3'>
				{isUserAuthenticatedAndNotUserAd && (
					<Heart className='w-10 h-10' carAdId={carAd.id} />
				)}
				<Title>{carAd.title}</Title>
			</div>
			<div className='flex lg:flex-row flex-col-reverse gap-7 mt-8'>
				<div className='xl:w-[30%] lg:w-[40%] w-full'>
					<div
						style={{ letterSpacing: '1px' }}
						className='p-2 text-4xl bg-primary text-white font-bold rounded-lg border'>
						{carAd.price}$
					</div>
					<div className='flex gap-2 sm:gap-5 lg:gap-3 items-center lg:items-stretch rounded-lg p-2 bg-primary text-white mt-3'>
						<div className='w-[30%]'>
							<Avatar className='w-full pb-[100%]'>
								<AvatarImage
									className='object-cover absolute top-0 left-0 rounded-full w-full h-full'
									src={
										carAd.userImage || '/default_avatar.svg'
									}
									alt='User avatar'
								/>
							</Avatar>
						</div>
						<div className='w-[70%] flex flex-col gap-2'>
							<SellerInfo
								isCurrentUserAd={
									isAuthenticated && user?.id === carAd.userId
								}
								carAd={carAd}
							/>
						</div>
					</div>
					<ActionLinks
						carAdId={carAd.id}
						isNotCurrentUserAd={isUserAuthenticatedAndNotUserAd}
					/>
					<CarAdAdditionalInfo
						carAdId={carAd.id}
						carAdDateOfCreation={carAd.dateOfCreation}
					/>
				</div>
				<div className='xl:w-[70%] lg:w-[60%] w-full'>
					<div>
						<Slider images={carAd.images} />
					</div>
					<h2 className='mt-5 font-bold text-2xl'>About the car:</h2>
					<AboutCar carAd={carAd} />
				</div>
			</div>
		</div>
	)
}

export default CarAdPage

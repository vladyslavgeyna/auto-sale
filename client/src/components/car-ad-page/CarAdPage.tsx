import { useUserStore } from '@/store/user'
import { IGetCarAdByIdOutput } from '@/types/car-ad/get-car-ad-by-id-output.interface'
import Image from 'next/image'
import { useShallow } from 'zustand/react/shallow'
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
					<div className='flex gap-3 rounded-lg p-2 bg-primary text-white mt-3'>
						<div className='w-[30%]'>
							<div>
								<Image
									alt='User image'
									width={100}
									height={100}
									src={
										carAd.userImage || '/default_avatar.svg'
									}
									className='rounded-full w-full h-full'
								/>
							</div>
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

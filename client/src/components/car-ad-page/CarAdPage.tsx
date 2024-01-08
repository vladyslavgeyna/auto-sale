import { useUserStore } from '@/store/user'
import { IGetCarAdByIdOutput } from '@/types/car-ad/get-car-ad-by-id-output.interface'
import Image from 'next/image'
import { useShallow } from 'zustand/react/shallow'
import Title from '../ui/Title'
import AboutCar from './AboutCar'
import ActionLinks from './ActionLinks'
import SellerInfo from './SellerInfo'
import Slider from './slider/Slider'

const CarAdPage = ({ carAd }: { carAd: IGetCarAdByIdOutput }) => {
	const { user, isAuthenticated } = useUserStore(
		useShallow(state => ({
			user: state.user,
			isAuthenticated: state.isAuthenticated,
		})),
	)

	return (
		<div>
			<div>
				<Title>{carAd.title}</Title>
			</div>
			<div className='flex lg:flex-row flex-col-reverse gap-7 mt-8'>
				<div className='xl:w-[30%] lg:w-[40%] w-full'>
					<div className='p-2 text-4xl bg-primary text-white font-bold rounded-lg border'>
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
						isNotCurrentUserAd={
							isAuthenticated && user?.id !== carAd.userId
						}
					/>
					<div className='text-sm mt-3'>
						The ad has been created at:{' '}
						<strong>{carAd.dateOfCreation}</strong>
					</div>
					<div className='text-sm mt-3'>
						Saved to favorites: <strong>{12}</strong>
					</div>
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

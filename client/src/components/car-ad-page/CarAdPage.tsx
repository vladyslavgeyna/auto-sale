import { useUserStore } from '@/store/user'
import { IGetCarAdByIdOutput } from '@/types/car-ad/get-car-ad-by-id-output.interface'
import Image from 'next/image'
import { FaRegComment, FaRegComments } from 'react-icons/fa'
import { FaPhone, FaScaleBalanced } from 'react-icons/fa6'
import { IoMail } from 'react-icons/io5'
import { useShallow } from 'zustand/react/shallow'
import Title from '../ui/Title'
import AboutCar from './AboutCar'
import ActionLink from './ActionLink'
import UserContact from './UserContact'
import Slider from './slider/Slider'

const CarAdPage = ({ carAd }: { carAd: IGetCarAdByIdOutput }) => {
	const { user } = useUserStore(
		useShallow(state => ({
			user: state.user,
		})),
	)

	const isCurrentUserAd = user && user.id === carAd.userId

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
							<div>
								<strong>
									Seller {isCurrentUserAd && '(You)'}
								</strong>
							</div>
							<div>
								{carAd.userName} {carAd.userSurname}
							</div>
							<UserContact
								type={carAd.userPhone ? 'phone' : 'none'}
								text={carAd.userPhone || 'Not specified'}
								icon={<FaPhone />}
							/>
							<UserContact
								type='email'
								text={carAd.userEmail}
								icon={<IoMail />}
							/>
						</div>
					</div>
					<ActionLink text='All reviews' icon={<FaRegComments />} />
					<ActionLink text='Leave a review' icon={<FaRegComment />} />
					<ActionLink
						text='Add car to comparison'
						icon={<FaScaleBalanced />}
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
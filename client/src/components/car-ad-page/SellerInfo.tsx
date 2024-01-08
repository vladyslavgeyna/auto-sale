import { IGetCarAdByIdOutput } from '@/types/car-ad/get-car-ad-by-id-output.interface'
import { FaPhone } from 'react-icons/fa6'
import { IoMail } from 'react-icons/io5'
import UserContact from './UserContact'

type PropsType = {
	isCurrentUserAd: boolean
	carAd: IGetCarAdByIdOutput
}

const SellerInfo = ({ carAd, isCurrentUserAd }: PropsType) => {
	return (
		<>
			<div>
				<strong>Seller {isCurrentUserAd && '(You)'}</strong>
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
		</>
	)
}

export default SellerInfo

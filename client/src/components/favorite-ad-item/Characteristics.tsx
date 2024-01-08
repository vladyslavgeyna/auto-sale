import { IFavoriteAd } from '@/types/favorite-ad/favorite-ad.interface'
import { FaMapLocationDot } from 'react-icons/fa6'
import { GiCarWheel } from 'react-icons/gi'
import { MdOutlineElectricBolt } from 'react-icons/md'
import { PiGasCan } from 'react-icons/pi'
import { SlSpeedometer } from 'react-icons/sl'
import { TbAutomaticGearbox, TbManualGearbox } from 'react-icons/tb'
import Characteristic from '../car-ad-item/Characteristic'

const Characteristics = ({ favoriteAd }: { favoriteAd: IFavoriteAd }) => {
	const engineIcon =
		favoriteAd.fuel === 'Electric' ? (
			<MdOutlineElectricBolt />
		) : (
			<PiGasCan />
		)

	let engineText = `${favoriteAd.fuel}, ${favoriteAd.engineCapacity} `

	engineText += favoriteAd.fuel === 'Electric' ? 'kW' : 'L'

	const transmissionIcon =
		favoriteAd.transmission === 'Manual' ? (
			<TbManualGearbox />
		) : (
			<TbAutomaticGearbox />
		)

	return (
		<div className='flex flex-col gap-2'>
			<Characteristic
				icon={<SlSpeedometer />}
				text={`${favoriteAd.mileage} thousand km.`}
			/>
			<Characteristic text={engineText} icon={engineIcon} />
			<Characteristic
				text={`${favoriteAd.transmission}`}
				icon={transmissionIcon}
			/>
			<Characteristic
				text={`${favoriteAd.wheelDrive}`}
				icon={<GiCarWheel />}
			/>
			<Characteristic
				icon={<FaMapLocationDot />}
				text={favoriteAd.region}
			/>
		</div>
	)
}

export default Characteristics

import { ICarAd } from '@/types/car-ad/car-ad.interface'
import Image from 'next/image'
import Link from 'next/link'
import { GiCarWheel } from 'react-icons/gi'
import { MdOutlineElectricBolt } from 'react-icons/md'
import { PiGasCan } from 'react-icons/pi'
import { SlSpeedometer } from 'react-icons/sl'
import { TbAutomaticGearbox, TbManualGearbox } from 'react-icons/tb'
import { Button } from '../ui/Button'
import Characteristic from './Characteristic'

type PropsType = {
	carAd: ICarAd
}

const CarAdItem = ({ carAd }: PropsType) => {
	const carAdLink = `/car-ad/${carAd.id}`

	const engineIcon =
		carAd.fuel === 'Electric' ? <MdOutlineElectricBolt /> : <PiGasCan />

	let engineText = `${carAd.fuel}, ${carAd.engineCapacity} `

	engineText += carAd.fuel === 'Electric' ? 'kW' : 'L'

	const transmissionIcon =
		carAd.transmission === 'Manual' ? (
			<TbManualGearbox />
		) : (
			<TbAutomaticGearbox />
		)

	return (
		<div className='border rounded-lg p-3 flex flex-col h-full gap-3'>
			<div className='flex-auto'>
				<div
					style={{ paddingBottom: '60%' }}
					className='overflow-hidden rounded-lg relative'>
					<Link href={carAdLink}>
						<Image
							priority={true}
							className='object-cover absolute top-0 left-0 h-full w-full hover:scale-[1.03] transition-all duration-300'
							width={1280}
							height={1280}
							alt={carAd.title}
							src={carAd.image}
						/>
					</Link>
				</div>
				<div>
					<h2 className='text-lg font-bold mt-2'>
						<Link className='hover:underline' href={carAdLink}>
							{carAd.title}
						</Link>
					</h2>
					<p className='font-bold mt-2'>{carAd.price}$</p>
					<div className='grid grid-cols-2 gap-4 mt-2'>
						<Characteristic
							text={`${carAd.mileage} thousand km.`}
							icon={<SlSpeedometer />}
						/>
						<Characteristic text={engineText} icon={engineIcon} />
						<Characteristic
							text={`${carAd.transmission}`}
							icon={transmissionIcon}
						/>
						<Characteristic
							text={`${carAd.wheelDrive}`}
							icon={<GiCarWheel />}
						/>
					</div>
				</div>
			</div>
			<div>
				<Button className='w-full p-0' type='button'>
					<Link className='w-full p-1' href={carAdLink}>
						View
					</Link>
				</Button>
			</div>
		</div>
	)
}

export default CarAdItem

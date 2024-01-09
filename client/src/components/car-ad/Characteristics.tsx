import { FaMapLocationDot } from 'react-icons/fa6'
import { GiCarWheel } from 'react-icons/gi'
import { MdOutlineElectricBolt } from 'react-icons/md'
import { PiGasCan } from 'react-icons/pi'
import { SlSpeedometer } from 'react-icons/sl'
import { TbAutomaticGearbox, TbManualGearbox } from 'react-icons/tb'
import Characteristic from '../car-ad-item/Characteristic'

type PropsType = {
	mileage: number
	fuel: string
	engineCapacity: number
	transmission: string
	wheelDrive: string
	region: string
}

const Characteristics = ({
	engineCapacity,
	fuel,
	mileage,
	region,
	transmission,
	wheelDrive,
}: PropsType) => {
	const engineIcon =
		fuel === 'Electric' ? <MdOutlineElectricBolt /> : <PiGasCan />

	let engineText = `${fuel}, ${engineCapacity} `

	engineText += fuel === 'Electric' ? 'kW' : 'L'

	const transmissionIcon =
		transmission === 'Manual' ? <TbManualGearbox /> : <TbAutomaticGearbox />

	return (
		<div className='flex flex-col gap-2'>
			<Characteristic
				icon={<SlSpeedometer />}
				text={`${mileage} thousand km.`}
			/>
			<Characteristic text={engineText} icon={engineIcon} />
			<Characteristic text={`${transmission}`} icon={transmissionIcon} />
			<Characteristic text={`${wheelDrive}`} icon={<GiCarWheel />} />
			<Characteristic icon={<FaMapLocationDot />} text={region} />
		</div>
	)
}

export default Characteristics

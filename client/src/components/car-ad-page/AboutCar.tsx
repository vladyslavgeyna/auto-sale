import { IGetCarAdByIdOutput } from '@/types/car-ad/get-car-ad-by-id-output.interface'
import AdditionalOptionsList from '../car-ad/AdditionalOptionsList'
import ColorBlock from '../car-ad/ColorBlock'
import { Table, TableBody, TableCell, TableRow } from '../ui/Table'

const AboutCar = ({ carAd }: { carAd: IGetCarAdByIdOutput }) => {
	return (
		<div>
			<Table className='mt-3'>
				<TableBody className='[&_td]:!p-3 [&_td]:!pl-0 [&_tr]:hover:bg-inherit !text-base'>
					<TableRow>
						<TableCell className='font-bold sm:min-w-60 min-w-48'>
							Brand
						</TableCell>
						<TableCell>{carAd.carBrand}</TableCell>
					</TableRow>
					<TableRow>
						<TableCell className='font-bold sm:min-w-60 min-w-48'>
							Model
						</TableCell>
						<TableCell>{carAd.carModel}</TableCell>
					</TableRow>
					<TableRow>
						<TableCell className='font-bold sm:min-w-60 min-w-48'>
							Year of production
						</TableCell>
						<TableCell>{carAd.yearOfProduction}</TableCell>
					</TableRow>
					<TableRow>
						<TableCell className='font-bold sm:min-w-60 min-w-48'>
							Mileage
						</TableCell>
						<TableCell>{carAd.mileage} thousand km.</TableCell>
					</TableRow>
					<TableRow>
						<TableCell className='font-bold sm:min-w-60 min-w-48'>
							Transmission
						</TableCell>
						<TableCell>{carAd.transmission}</TableCell>
					</TableRow>
					<TableRow>
						<TableCell className='font-bold sm:min-w-60 min-w-48'>
							Fuel
						</TableCell>
						<TableCell>{carAd.fuel}</TableCell>
					</TableRow>
					<TableRow>
						<TableCell className='font-bold sm:min-w-60 min-w-48'>
							Engine capacity
						</TableCell>
						<TableCell>
							{carAd.engineCapacity}{' '}
							{carAd.fuel === 'Electric' ? 'kW' : 'L'}
						</TableCell>
					</TableRow>
					<TableRow>
						<TableCell className='font-bold sm:min-w-60 min-w-48'>
							Wheel drive
						</TableCell>
						<TableCell>{carAd.wheelDrive}</TableCell>
					</TableRow>
					<TableRow>
						<TableCell className='font-bold sm:min-w-60 min-w-48'>
							Color
						</TableCell>
						<TableCell className='flex items-center gap-3'>
							{carAd.color}
							<ColorBlock color={carAd.color} />
						</TableCell>
					</TableRow>
					<TableRow>
						<TableCell className='font-bold sm:min-w-60 min-w-48'>
							Number of seats
						</TableCell>
						<TableCell>{carAd.numberOfSeats}</TableCell>
					</TableRow>
					<TableRow>
						<TableCell className='font-bold sm:min-w-60 min-w-48'>
							Additional options
						</TableCell>
						<TableCell>
							{carAd.additionalOptions ? (
								<AdditionalOptionsList
									options={carAd.additionalOptions.split(
										', ',
									)}
								/>
							) : (
								'Not specified'
							)}
						</TableCell>
					</TableRow>
					<TableRow>
						<TableCell className='font-bold sm:min-w-60 min-w-48'>
							Location
						</TableCell>
						<TableCell>{carAd.region}</TableCell>
					</TableRow>
				</TableBody>
			</Table>
			<div className='mt-5 font-bold text-2xl'>
				Description of the car from the seller:
			</div>
			<div className='mt-3 whitespace-pre-wrap break-words text-[17px]'>
				{carAd.text}
			</div>
		</div>
	)
}

export default AboutCar

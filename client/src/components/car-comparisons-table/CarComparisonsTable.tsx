import { IGetCarComparisonsOutput } from '@/types/car-comparison/get-car-comparisons-output.interface'
import AdditionalOptionsList from '../car-ad/AdditionalOptionsList'
import ColorBlock from '../car-ad/ColorBlock'
import TableHeadItem from './TableHeadItem'

const CarComparisonsTable = ({
	carComparisons,
}: {
	carComparisons: IGetCarComparisonsOutput
}) => {
	return (
		<div className='overflow-auto'>
			<table className='[&_td:first-child]:sticky [&_td:first-child]:bg-white [&_td:first-child]:left-[-1px] [&_td:first-child]:z-10 table-fixed border-collapse border [&_td]:border w-full [&_td]:w-56 sm:[&_td]:w-64 [&_td:first-child]:w-40 md:[&_td]:w-72 md:[&_td:first-child]:w-52 [&_td:first-child]:font-bold [&_td]:p-2'>
				<tbody>
					<tr>
						<td></td>
						{carComparisons.map(carComparison => (
							<td
								className='relative'
								key={carComparison.carAdId + 'title'}>
								<TableHeadItem carComparison={carComparison} />
							</td>
						))}
					</tr>
					<tr>
						<td>Price</td>
						{carComparisons.map(carComparison => (
							<td key={carComparison.carAdId + 'price'}>
								{carComparison.price}$
							</td>
						))}
					</tr>
					<tr>
						<td>Brand</td>
						{carComparisons.map(carComparison => (
							<td key={carComparison.carAdId + 'brand'}>
								{carComparison.carBrandName}
							</td>
						))}
					</tr>
					<tr>
						<td>Model</td>
						{carComparisons.map(carComparison => (
							<td key={carComparison.carAdId + 'model'}>
								{carComparison.carModelName}
							</td>
						))}
					</tr>
					<tr>
						<td>Year of production</td>
						{carComparisons.map(carComparison => (
							<td
								key={
									carComparison.carAdId + 'yearOfProduction'
								}>
								{carComparison.yearOfProduction}
							</td>
						))}
					</tr>
					<tr>
						<td>Mileage</td>
						{carComparisons.map(carComparison => (
							<td key={carComparison.carAdId + 'mileage'}>
								{carComparison.mileage}
							</td>
						))}
					</tr>
					<tr>
						<td>Transmission</td>
						{carComparisons.map(carComparison => (
							<td key={carComparison.carAdId + 'transmission'}>
								{carComparison.transmission}
							</td>
						))}
					</tr>
					<tr>
						<td>Fuel</td>
						{carComparisons.map(carComparison => (
							<td key={carComparison.carAdId + 'fuel'}>
								{carComparison.fuel}
							</td>
						))}
					</tr>
					<tr>
						<td>Engine capacity / power</td>
						{carComparisons.map(carComparison => (
							<td key={carComparison.carAdId + 'engineCapacity'}>
								{carComparison.engineCapacity}{' '}
								{carComparison.fuel === 'Electric' ? 'kW' : 'L'}
							</td>
						))}
					</tr>
					<tr>
						<td>Wheel drive</td>
						{carComparisons.map(carComparison => (
							<td key={carComparison.carAdId + 'wheelDrive'}>
								{carComparison.wheelDrive}
							</td>
						))}
					</tr>
					<tr>
						<td>Color</td>
						{carComparisons.map(carComparison => (
							<td key={carComparison.carAdId + 'color'}>
								<div className='flex items-center gap-3'>
									<span>{carComparison.color}</span>
									<ColorBlock color={carComparison.color} />
								</div>
							</td>
						))}
					</tr>
					<tr>
						<td>Number of seats</td>
						{carComparisons.map(carComparison => (
							<td key={carComparison.carAdId + 'numberOfSeats'}>
								{carComparison.numberOfSeats}
							</td>
						))}
					</tr>
					<tr>
						<td>Additional options</td>
						{carComparisons.map(carComparison => (
							<td
								key={
									carComparison.carAdId + 'additionalOptions'
								}>
								{carComparison.additionalOptions ? (
									<AdditionalOptionsList
										options={carComparison.additionalOptions.split(
											', ',
										)}
									/>
								) : (
									'Not specified'
								)}
							</td>
						))}
					</tr>
					<tr>
						<td>Location</td>
						{carComparisons.map(carComparison => (
							<td key={carComparison.carAdId + 'region'}>
								{carComparison.region}
							</td>
						))}
					</tr>
				</tbody>
			</table>
		</div>
	)
}

export default CarComparisonsTable

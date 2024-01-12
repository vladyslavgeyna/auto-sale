import { useDeleteCarAd } from '@/hooks/useDeleteCarAd'
import { useToggleCarAdActive } from '@/hooks/useToggleCarAdActive'
import { IGetAllUserCarAd } from '@/types/car-ad/get-user-car-ads-output.interface'
import { Loader2 } from 'lucide-react'
import Link from 'next/link'
import CarAdTitle from '../car-ad-general/CarAdTitle'
import Characteristics from '../car-ad-general/Characteristics'
import ImageBlock from '../car-ad-general/ImageBlock'
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from '../ui/AlertDialog'
import { Button } from '../ui/Button'

const MyAdItem = ({ carAd }: { carAd: IGetAllUserCarAd }) => {
	const carAdLink = `/car-ad/${carAd.id}`

	const { mutate: toggle, isPending: isTogglingPending } =
		useToggleCarAdActive(carAd.id)

	const { mutate: remove, isPending: isDeletePending } = useDeleteCarAd(
		carAd.id,
	)

	const handleDeleteCarAd = () => {
		remove(carAd.id)
	}

	const handleToggleCarAdActive = () => {
		toggle(carAd.id)
	}

	return (
		<div className='h-full border rounded p-4'>
			<div className='flex flex-col lg:flex-row lg:items-center gap-6	'>
				<div className='lg:w-1/3'>
					<ImageBlock
						image={carAd.image}
						alt={carAd.title}
						carAdLink={carAdLink}
					/>
				</div>
				<div className='lg:w-4/6 flex gap-2 flex-col justify-between self-stretch'>
					<CarAdTitle carAdLink={carAdLink} title={carAd.title} />
					<Characteristics
						engineCapacity={carAd.engineCapacity}
						fuel={carAd.fuel}
						mileage={carAd.mileage}
						region={carAd.region}
						transmission={carAd.transmission}
						wheelDrive={carAd.wheelDrive}
					/>
					<div className='flex-col sm:flex-row flex items-center justify-between gap-2'>
						<div className='text-sm flex flex-col gap-0.5 text-slate-500 self-start sm:self-center'>
							Created at: {carAd.dateOfCreation}
						</div>
						<div className='flex flex-col items-stretch w-full sm:w-[initial] sm:flex-row gap-3 sm:items-center'>
							<Button type='button' className='!p-0'>
								<Link className='w-full px-4 py-2' href={'/'}>
									Edit
								</Link>
							</Button>
							<Button
								onClick={handleToggleCarAdActive}
								className='min-w-[115px]'
								type='button'>
								{isTogglingPending ? (
									<Loader2 className='animate-spin h-6 w-6' />
								) : (
									<>
										<span>
											{carAd.isActive
												? 'Deactivate'
												: 'Activate'}
										</span>
									</>
								)}
							</Button>
							<AlertDialog defaultOpen={false}>
								<AlertDialogTrigger asChild>
									<Button
										className='min-w-[83px]'
										type='button'>
										{isDeletePending ? (
											<Loader2 className='animate-spin h-6 w-6' />
										) : (
											<>
												<span>Delete</span>
											</>
										)}
									</Button>
								</AlertDialogTrigger>
								<AlertDialogContent>
									<AlertDialogCancel className='hover:bg-inherit hover:text-slate-700 border-none absolute top-0 right-0'>
										&#88;
									</AlertDialogCancel>
									<AlertDialogHeader>
										<AlertDialogTitle>
											Are you absolutely sure?
										</AlertDialogTitle>
										<AlertDialogDescription>
											This action cannot be undone. This
											will permanently delete this ad and
											remove its data from our servers.
										</AlertDialogDescription>
									</AlertDialogHeader>
									<AlertDialogFooter>
										<AlertDialogCancel>
											Cancel
										</AlertDialogCancel>
										<AlertDialogAction
											onClick={handleDeleteCarAd}>
											Delete anyway
										</AlertDialogAction>
									</AlertDialogFooter>
								</AlertDialogContent>
							</AlertDialog>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default MyAdItem

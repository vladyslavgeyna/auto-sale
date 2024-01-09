import { IGetAllUserCarAd } from '@/types/car-ad/get-user-car-ads-output.interface'
import Image from 'next/image'
import Link from 'next/link'
import Characteristics from '../favorite-ad-item/Characteristics'
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

	return (
		<div className='h-full border rounded p-4'>
			<div className='flex flex-col lg:flex-row lg:items-center gap-6	'>
				<div className='lg:w-1/3'>
					<div
						style={{ paddingBottom: '50%' }}
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
				</div>
				<div className='lg:w-4/6 flex gap-2 flex-col justify-between self-stretch'>
					<div>
						<h2 className='font-bold text-lg'>
							<Link className='hover:underline' href={carAdLink}>
								{carAd.title}
							</Link>
						</h2>
					</div>
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
							<Button type='button'>Activate</Button>
							<AlertDialog defaultOpen={false}>
								<AlertDialogTrigger asChild>
									<Button type='button'>Delete</Button>
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
											will permanently delete your account
											and remove your data from our
											servers.
										</AlertDialogDescription>
									</AlertDialogHeader>
									<AlertDialogFooter>
										<AlertDialogCancel>
											Cancel
										</AlertDialogCancel>
										<AlertDialogAction>
											Continue
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

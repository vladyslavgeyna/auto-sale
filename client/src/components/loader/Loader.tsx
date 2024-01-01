import { Loader2 } from 'lucide-react'

const Loader = () => {
	return (
		<div className='flex flex-col gap-2 items-center'>
			<Loader2 className='h-12 w-12 animate-spin' />
			<p className='text-lg'>Loading...</p>
		</div>
	)
}

export default Loader

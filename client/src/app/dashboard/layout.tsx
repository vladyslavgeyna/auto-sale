import RequireAdmin from '@/hoc/RequireAdmin'
import DashboardSidebar from './DashboardSidebar'

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
	return (
		<RequireAdmin>
			<div className='flex h-[calc(100vh_-_113px)] gap-0.5 lg:gap-3 [&_button]:hover:!no-underline'>
				<div className='text-white overflow-auto -ml-8 md:ml-0 w-44 lg:w-56 flex bg-primary rounded-lg '>
					<DashboardSidebar />
				</div>
				<div className='p-3 flex-auto rounded-lg overflow-hidden'>
					{children}
				</div>
			</div>
		</RequireAdmin>
	)
}

export default DashboardLayout

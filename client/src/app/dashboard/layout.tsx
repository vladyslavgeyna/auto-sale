import RequireAdmin from '@/hoc/RequireAdmin'
import DashboardSidebar from './DashboardSidebar'

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
	return (
		<RequireAdmin>
			<div className='flex min-h-screen gap-3 [&_button]:hover:!no-underline'>
				<div className='text-white w-[15%] flex bg-primary rounded-lg overflow-hidden'>
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

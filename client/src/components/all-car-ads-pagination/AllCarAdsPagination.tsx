import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { PaginationControl } from 'react-bootstrap-pagination-control'
import './AllCarAdsPagination.css'

type PropsType = {
	page: number
	limit: number
	totalCount: number
}

const AllCarAdsPagination = ({ page, limit, totalCount }: PropsType) => {
	const router = useRouter()

	const pathname = usePathname()

	const searchParams = useSearchParams()

	const updatePageQueryParam = (page: number) => {
		const params = new URLSearchParams(searchParams.toString())

		params.set('page', page.toString())

		router.push(pathname + '?' + params.toString())
	}

	return (
		<div className='flex justify-center gap-1.5'>
			<PaginationControl
				page={page}
				limit={limit}
				total={totalCount}
				last={true}
				next={true}
				changePage={page => {
					updatePageQueryParam(page)
				}}
			/>
		</div>
	)
}

export default AllCarAdsPagination

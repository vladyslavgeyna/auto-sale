import {
	Accordion,
	AccordionContent,
	AccordionItem as AccordionItemShadcn,
	AccordionTrigger,
} from '@/components/ui/Accordion'
import Link from 'next/link'
import React from 'react'
import { FaCar, FaCarSide } from 'react-icons/fa'
import { FaRegCircleDot } from 'react-icons/fa6'
import { TiHome } from 'react-icons/ti'

const AccordionTitle = ({
	icon,
	title,
}: {
	icon: React.ReactNode
	title: string
}) => {
	return (
		<div className='flex items-center gap-2'>
			{icon}
			<span>{title}</span>
		</div>
	)
}

const AccordionItem = ({
	icon,
	title,
	children,
	value,
}: {
	icon: React.ReactNode
	children: React.ReactNode
	title: string
	value: string
}) => {
	return (
		<AccordionItemShadcn value={value}>
			<AccordionTrigger className='hover:bg-[#303d53] px-2'>
				<AccordionTitle icon={icon} title={title} />
			</AccordionTrigger>
			<AccordionContent className='!pb-0'>{children}</AccordionContent>
		</AccordionItemShadcn>
	)
}

const AccordionLinkItem = ({
	title,
	href,
}: {
	title: string
	href: string
}) => {
	return (
		<div>
			<Link
				className='flex items-center gap-2 hover:bg-[#303d53] py-4 font-medium px-2'
				href={href}>
				<FaRegCircleDot />
				<span>{title}</span>
			</Link>
		</div>
	)
}

const DashboardSidebar = () => {
	return (
		<Accordion type='single' collapsible={true} className='w-full'>
			<div className='border-b'>
				<Link
					className='flex items-center gap-2 hover:bg-[#303d53] py-4 font-medium px-2'
					href={'/dashboard'}>
					<TiHome />
					<span>Home</span>
				</Link>
			</div>
			<AccordionItem
				icon={<FaCar />}
				title={'Car brands'}
				value='car-brands'>
				<AccordionLinkItem
					title='Create car brand'
					href='/dashboard/car-brands/create'
				/>
			</AccordionItem>
			<AccordionItem
				icon={<FaCarSide />}
				title={'Car models'}
				value='car-models'>
				<AccordionLinkItem
					title='Create car model'
					href='/dashboard/car-models/create'
				/>
			</AccordionItem>
		</Accordion>
	)
}

export default DashboardSidebar

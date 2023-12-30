import Footer from '@/components/layout/footer/Footer'
import Header from '@/components/layout/header/Header'
import Wrapper from '@/hoc/Wrapper'
import type { Metadata } from 'next'
import { Nunito } from 'next/font/google'
import './globals.css'

const nunito = Nunito({ subsets: ['latin', 'cyrillic'] })

export const metadata: Metadata = {
	title: 'Auto Sale',
	description: 'Auto Sale website',
}

export default function RootLayout({
	children,
}: {
	children: React.ReactNode
}) {
	return (
		<html lang='en'>
			<body className={nunito.className}>
				<Wrapper>
					<Header />
					<main className='flex-auto mt-16 container max-w-screen-2xl'>
						{children}
					</main>
					<Footer />
				</Wrapper>
			</body>
		</html>
	)
}

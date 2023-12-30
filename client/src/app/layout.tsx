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
			<body className={nunito.className}>{children}</body>
		</html>
	)
}

import Title from '@/components/ui/Title'

const page = () => {
	return (
		<div className='[&_p]:text-lg [&_p]:mt-3'>
			<Title>Privacy Policy</Title>
			<p className='!text-xl'>Last Updated: January 10, 2024</p>
			<p>
				This is a study project, and it is important to note that this
				website/application is part of an educational endeavor / a
				personal project ("pet project"). As such, it is crucial to
				understand that this platform is primarily developed for
				learning purposes, and no one involved in this project assumes
				any responsibility for the information presented. Usage of this
				platform is at your own risk.. As such, no one involved in this
				project assumes any responsibility for the information
				presented, and the use of this platform is at your own risk.
			</p>

			<p>
				Please be aware that since this is a learning project,there may
				be limitations in terms of security and data protection. We
				recommend using fictitious or minimal personal information when
				interacting with this platform.
			</p>
			<p>
				Please note that, with the exception of the photos you upload,
				which are stored on AWS S3, no data provided on this site is
				shared with any third party.
			</p>
			<p>
				We use cookies to enhance your experience while using this
				platform. Cookies are small pieces of data stored on your device
				that help us improve functionality and analyze usage patterns.
				By using this platform, you consent to the use of cookies.
			</p>
			<p>
				Please be aware that the source code for this project is
				open-source and can be accessed on our{' '}
				<a
					className='text-primary hover:underline font-bold'
					target='_blank'
					href='https://github.com/vladyslavgeyna/auto-sale'>
					public repository
				</a>
				. By using this platform, you acknowledge that the code is
				publicly available.
			</p>
			<p>
				If you have any questions or concerns, feel free to reach out to
				us using the provided email{' '}
				<a
					className='text-primary hover:underline font-bold'
					href='mailto:vladgeina@gmail.com'>
					vladgeina@gmail.com
				</a>
				.
			</p>
		</div>
	)
}

export default page

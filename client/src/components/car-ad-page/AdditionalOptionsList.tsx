import AdditionalOptionsItem from './AdditionalOptionsItem'

const AdditionalOptionsList = ({ options }: { options: string[] }) => {
	return (
		<div className='flex items-center gap-2 flex-wrap'>
			{options.map((option, index) => {
				return <AdditionalOptionsItem key={index} text={option} />
			})}
		</div>
	)
}

export default AdditionalOptionsList

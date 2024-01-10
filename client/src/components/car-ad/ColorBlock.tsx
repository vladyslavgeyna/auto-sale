const ColorBlock = ({ color }: { color: string }) => {
	return (
		<span
			className='rounded border w-4 h-4'
			style={{
				backgroundColor: color === 'Multicolored' ? 'white' : color,
			}}
		/>
	)
}

export default ColorBlock

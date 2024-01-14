const ColorBlock = ({ color }: { color: string }) => {
	return color === 'Multicolored' ? null : (
		<span
			className='rounded border w-4 h-4'
			style={{
				backgroundColor: color,
			}}
		/>
	)
}

export default ColorBlock

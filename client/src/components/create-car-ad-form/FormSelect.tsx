export type SelectItemType = {
	key: string
	value: string
}

type FormSelectPropsType = {
	placeholder: string
	items: SelectItemType[]
	register: any
	onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void
}

const FormSelect = ({
	placeholder,
	items,
	register,
	onChange,
}: FormSelectPropsType) => {
	return (
		<select
			className='cursor-pointer flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50'
			defaultValue={''}
			{...register}
			onChange={onChange}>
			<option value='' disabled>
				{placeholder}
			</option>
			{items.map(item => {
				return (
					<option key={item.key} value={item.key}>
						{item.value}
					</option>
				)
			})}
		</select>
	)
}

type FormSelectWithDefaultPropsType = {
	items: SelectItemType[]
	register: any
	onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void
}

export const FormSelectWithDefault = ({
	items,
	register,
	onChange,
}: FormSelectWithDefaultPropsType) => {
	return (
		<select
			className='cursor-pointer flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50'
			{...register}
			onChange={onChange}>
			{items.map(item => {
				return (
					<option key={item.key} value={item.key}>
						{item.value}
					</option>
				)
			})}
		</select>
	)
}

export default FormSelect

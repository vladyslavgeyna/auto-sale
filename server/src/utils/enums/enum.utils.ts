import { EnumDto } from './enum.dto'

/**
 *
 * @param value Value to check
 * @param enumType Enum type to check
 * @returns True if value is in enum, false otherwise
 */
export function hasEnumValue(value: number, enumType: object) {
	if (!(value in enumType)) {
		return false
	}
	return true
}

/**
 *
 * @param enumType Enum type to check
 * @returns Max value of enum
 */
export function getMaxOfEnum(enumType: object) {
	const values = Object.keys(enumType)
		.map(k => (k === '' ? NaN : +k))
		.filter(k => !isNaN(k))
	return Math.max(...values)
}

/**
 *
 * @param enumType Enum type to check
 * @returns Min value of enum
 */
export function getMinOfEnum(enumType: object) {
	const values = Object.keys(enumType)
		.map(k => (k === '' ? NaN : +k))
		.filter(k => !isNaN(k))
	return Math.min(...values)
}

/**
 *
 * @param enumType Enum type to get values from
 * @returns Array of enum values as EnumDto: { id: number, value: string }
 */
export function getEnumAsEnumDtoArray(enumType: any): EnumDto[] {
	const values: EnumDto[] = []
	const maxEnumValue = getMaxOfEnum(enumType)
	const minEnumValue = getMinOfEnum(enumType)
	for (let i = minEnumValue; i <= maxEnumValue; i++) {
		values.push({
			value: enumType[i],
			id: i,
		})
	}
	return values
}

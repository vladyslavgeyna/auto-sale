export const formatFileName = (name: string): string => {
	const maxLength = 10
	if (name.length > maxLength) {
		const fileName = name.split('.')[0]
		const firstPart = fileName.slice(0, 5)
		const lastPart = fileName.slice(-2)
		const extension = name.split('.').pop()
		return `${firstPart}...${lastPart}.${extension}`
	}
	return name
}

export const CURRENT_YEAR = new Date().getFullYear()

export const getArrayInRange = (start: number, end: number): number[] => {
	const list = []
	for (var i = start; i <= end; i++) {
		list.push(i)
	}
	return list
}

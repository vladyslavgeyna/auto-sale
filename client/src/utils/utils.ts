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

export function generateRandomString() {
	let result = ''
	const characters =
		'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
	const charactersLength = characters.length
	let counter = 0
	while (counter < 16) {
		result += characters.charAt(
			Math.floor(Math.random() * charactersLength),
		)
		counter += 1
	}
	return result
}

export function generateRandomInt(min: number, max: number) {
	return Math.floor(Math.random() * (max - min) + min)
}

export function getExtension(fileName: string) {
	return fileName.split('.').pop()
}

export function renameFile(originalFile: File, newName: string) {
	return new File([originalFile], newName, {
		type: originalFile.type,
		lastModified: originalFile.lastModified,
	})
}

export const renameFiles = (files: FileList): FileList => {
	const dataTransfer = new DataTransfer()
	for (let i = 0; i < files.length; i++) {
		const newFileName =
			generateRandomString() + `.${getExtension(files[i].name)}`
		dataTransfer.items.add(renameFile(files[i], newFileName))
	}
	return dataTransfer.files
}

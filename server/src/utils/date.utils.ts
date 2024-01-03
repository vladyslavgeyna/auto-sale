export const currentYear = new Date().getFullYear()

/**
 *
 * @param date Date to format
 * @returns Formatted date in format dd.mm.yyyy hh:mm
 */
export const getFormattedDate = (date: Date) => {
	const year = date.getFullYear()
	const month = ('0' + (date.getMonth() + 1)).slice(-2)
	const day = ('0' + date.getDate()).slice(-2)
	const hours = date.getHours()
	const minutes = ('0' + date.getMinutes()).slice(-2)
	return `${day}.${month}.${year} ${hours}:${minutes}`
}

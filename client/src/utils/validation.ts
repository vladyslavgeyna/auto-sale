export const EMAIL_REGEXP =
	/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

export const PHONE_NUMBER_REGEXP =
	/^(050|066|095|099|063|073|093|067|068|096|097|098|091|092|094)\d{3}\d{2}\d{2}$/

export const PASSWORD_REGEXP = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}$/

export const ACCEPT_IMAGE_TYPES = ['image/jpeg', 'image/jpg', 'image/png']

export const MAX_FILE_SIZE = 1024 * 1024 * 5

export const MAX_IMAGES_COUNT = 5

export const validateImages = (images: FileList | null): string | null => {
	if (images && images.length > 0) {
		if (images.length > MAX_IMAGES_COUNT) {
			return `Maximum images count is ${MAX_IMAGES_COUNT}.`
		}
		for (let i = 0; i < images.length; i++) {
			if (!ACCEPT_IMAGE_TYPES.some(t => t === images[0].type)) {
				return 'Only png and jpeg files are valid.'
			}
			if (images[0].size > MAX_FILE_SIZE) {
				return 'One or more files are too large. Max file size is 5MB.'
			}
		}
		return null
	} else {
		return 'Images are required.'
	}
}

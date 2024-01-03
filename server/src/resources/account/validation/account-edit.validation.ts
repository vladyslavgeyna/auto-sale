import { body } from 'express-validator'

export const accountEditValidation = [
	body('name')
		.trim()
		.notEmpty()
		.escape()
		.isLength({ min: 2, max: 100 })
		.withMessage(`Name length should be from 5 to 100 characters`),
	body('surname')
		.trim()
		.notEmpty()
		.escape()
		.isLength({ min: 2, max: 100 })
		.withMessage(`Surname length should be from 5 to 100 characters`),
	body('phone')
		.optional()
		.trim()
		.escape()
		.custom(value => {
			if (
				value &&
				!/^(050|066|095|099|063|073|093|067|068|096|097|098|091|092|094)\d{3}\d{2}\d{2}$/.test(
					value,
				)
			) {
				throw new Error('Not a valid phone number')
			}
			return true
		}),
]

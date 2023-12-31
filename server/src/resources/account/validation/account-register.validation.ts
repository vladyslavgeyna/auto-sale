import { body } from 'express-validator'
import passwordValidator from 'password-validator'

const passwordSchema = new passwordValidator()
passwordSchema
	.is()
	.min(6)
	.is()
	.max(50)
	.has()
	.uppercase()
	.has()
	.lowercase()
	.has()
	.digits()
	.has()
	.not()
	.spaces()

export const accountRegisterValidation = [
	body('email')
		.trim()
		.notEmpty()
		.escape()
		.isEmail()
		.withMessage('Not a valid e-mail address'),
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
		.trim()
		.notEmpty()
		.escape()
		.matches(
			/^(050|066|095|099|063|073|093|067|068|096|097|098|091|092|094)\d{3}\d{2}\d{2}$/,
		)
		.withMessage(`Not a valid phone number`),
	body('password')
		.trim()
		.notEmpty()
		.custom((value, {}) => {
			const passwordValidationResult = passwordSchema.validate(value, {
				details: true,
				list: true,
			})
			if (
				Array.isArray(passwordValidationResult) &&
				passwordValidationResult.length > 0
			) {
				const validationErrors = passwordValidationResult.map(error =>
					error.message.replace('string', 'password'),
				)

				throw new Error(
					'Invalid password: ' + validationErrors.join('; '),
				)
			}
			return true
		}),
	body('passwordConfirm').custom((value, { req }) => {
		if (value !== req.body.password) {
			throw new Error('Passwords do not match')
		}
		return true
	}),
]

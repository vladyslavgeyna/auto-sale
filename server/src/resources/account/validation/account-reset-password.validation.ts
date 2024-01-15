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

export const accountResetPasswordValidation = [
	body('resetPasswordUniqueId')
		.trim()
		.notEmpty()
		.escape()
		.withMessage(`Reset password unique id is required`),
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

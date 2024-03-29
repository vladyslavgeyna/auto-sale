import { body } from 'express-validator'
import { hasEnumValue } from '../../../utils/enums/enum.utils'
import { Color } from '../../car/enums/color.enum'
import { Fuel } from '../../car/enums/fuel.enum'
import { Region } from '../../car/enums/region.enum'
import { Transmission } from '../../car/enums/transmission.enum'
import { WheelDrive } from '../../car/enums/wheel-drive.enum'
import { currentYear } from './../../../utils/date.utils'

export const createCarAdValidation = [
	body('title')
		.trim()
		.notEmpty()
		.isLength({ min: 3, max: 50 })
		.withMessage('Title length should be from 3 to 50 characters'),
	body('text')
		.trim()
		.notEmpty()
		.isLength({ min: 10, max: 1000 })
		.withMessage(`Text length should be from 5 to 1000 characters`),
	body('additionalOptions')
		.optional()
		.trim()
		.isLength({ min: 2, max: 150 })
		.withMessage(`Additional options should be from 2 to 150 characters`)
		.custom(value => {
			if (
				value &&
				!/^([a-zA-Z0-9 -]+(?:,\s*[a-zA-Z0-9 -]+)*)?$/.test(value)
			) {
				throw new Error(
					'Not valid additional options format. They should be separated by commas and contain only letters, digits, dashes and spaces',
				)
			}
			return true
		}),
	body('yearOfProduction')
		.trim()
		.notEmpty()
		.isInt({ min: 1900, max: currentYear })
		.withMessage(
			`Year of production should be from 1900 to ${currentYear}`,
		),
	body('color')
		.trim()
		.notEmpty()
		.isInt()
		.custom(value => {
			if (!hasEnumValue(Number(value), Color)) {
				throw new Error('Invalid color')
			}
			return true
		}),
	body('fuel')
		.trim()
		.notEmpty()
		.isInt()
		.custom(value => {
			if (!hasEnumValue(Number(value), Fuel)) {
				throw new Error('Invalid fuel')
			}
			return true
		}),
	body('transmission')
		.trim()
		.notEmpty()
		.isInt()
		.custom(value => {
			if (!hasEnumValue(Number(value), Transmission)) {
				throw new Error('Invalid transmission')
			}
			return true
		}),
	body('wheelDrive')
		.trim()
		.notEmpty()
		.isInt()
		.custom(value => {
			if (!hasEnumValue(Number(value), WheelDrive)) {
				throw new Error('Invalid wheelDrive')
			}
			return true
		}),
	body('region')
		.trim()
		.notEmpty()
		.isInt()
		.custom(value => {
			if (!hasEnumValue(Number(value), Region)) {
				throw new Error('Invalid region')
			}
			return true
		}),
	body('price')
		.trim()
		.notEmpty()
		.isInt({ min: 1, max: 100000000 })
		.withMessage('Price should be from 1 to 100000000')
		.custom(value => {
			if (value && !/^[1-9]\d*$/.test(value)) {
				throw new Error('Invalid price')
			}
			return true
		}),
	body('carBrandId')
		.trim()
		.notEmpty()
		.isInt()
		.withMessage('Invalid car brand'),
	body('carModelId')
		.trim()
		.notEmpty()
		.isInt()
		.withMessage('Invalid car model'),
	body('engineCapacity')
		.trim()
		.notEmpty()
		.isFloat({ min: 0, max: 1000 })
		.withMessage(
			'Invalid engine capacity or power. It should be from 0 to 1000',
		),
	body('numberOfSeats')
		.trim()
		.notEmpty()
		.isInt()
		.withMessage('Invalid number of seats')
		.custom(value => {
			if (Number(value) < 1 || Number(value) > 60) {
				throw new Error(`Number of seats should be from 1 to 60`)
			}
			return true
		}),
	body('mileage')
		.trim()
		.notEmpty()
		.isInt()
		.withMessage('Invalid mileage')
		.custom(value => {
			if (Number(value) < 0 || Number(value) > 999) {
				throw new Error(`Mileage should be from 0 to 999`)
			}
			return true
		}),
	body('mainImageName').trim().notEmpty().withMessage('Invalid main image'),
]

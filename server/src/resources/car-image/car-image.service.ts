import { Repository } from 'typeorm'
import { appDataSource } from '../../data-source'
import { Car } from '../car/car.entity'
import imageService from '../image/image.service'
import { CarImage } from './car-image.entity'
import { deleteCarImageOptions } from './car-image.utils'

class CarImageService {
	private carImageRepository: Repository<CarImage>

	constructor() {
		this.carImageRepository = appDataSource.getRepository(CarImage)
	}

	/**
	 * Deletes all images of a car including the images from the storage (AWS S3) and the database
	 * @param carId car id to delete its images
	 */
	async deleteByCarId(carId: number) {
		const carImages = await this.carImageRepository.find(
			deleteCarImageOptions(carId),
		)

		await this.carImageRepository.remove(carImages)

		for (const carImage of carImages) {
			await imageService.deleteByName(carImage.image.name)
		}
	}

	/**
	 *
	 * @param images Array of images to save
	 * @param car Car to which the images belong
	 * @param mainImageName Name of the main image
	 */
	async saveImages(
		images: Express.Multer.File[],
		car: Car,
		mainImageName: string,
	) {
		for (const image of images) {
			const createdImage = await imageService.save(image)

			const newCarImage = this.carImageRepository.create({
				car,
				image: createdImage,
				isMain: mainImageName === image.originalname,
			})

			await this.carImageRepository.save(newCarImage)
		}
	}
}

export default new CarImageService()

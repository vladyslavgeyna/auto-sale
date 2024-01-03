import { Repository } from 'typeorm'
import { appDataSource } from '../../data-source'
import { Car } from '../car/car.entity'
import imageService from '../image/image.service'
import { CarImage } from './car-image.entity'

class CarImageService {
	private carImageRepository: Repository<CarImage>

	constructor() {
		this.carImageRepository = appDataSource.getRepository(CarImage)
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

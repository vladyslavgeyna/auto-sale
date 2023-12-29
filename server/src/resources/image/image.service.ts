import sharp from 'sharp'
import { Repository } from 'typeorm'
import * as uuid from 'uuid'
import { appDataSource } from '../../data-source'
import awsService from '../aws/aws.service'
import UploadFileInputDto from '../aws/dtos/upload-file-input.dto'
import { Image } from './image.entity'

class ImageService {
	private imageRepository: Repository<Image>
	private IMAGE_FILE_EXTENSION = '.jpeg'
	private MAX_SIZE_TO_RESIZE = 1280
	private COMPRESSION_QUALITY = 80
	private IMAGE_MIME_TYPE = 'image/jpeg'

	constructor() {
		this.imageRepository = appDataSource.getRepository(Image)
	}

	/**
	 *
	 * @param file the file to save. Can be taken from req.file
	 * @returns the saved image
	 */
	async save(file: Express.Multer.File): Promise<Image> {
		const uniqueFileName = uuid.v4()

		const buffer = await this.resizeImage(file.buffer)

		const fileData: UploadFileInputDto = {
			fileName: uniqueFileName,
			fileBuffer: buffer,
			mimeType: this.IMAGE_MIME_TYPE,
		}

		await awsService.uploadImage(fileData)

		const image = this.imageRepository.create({
			name: uniqueFileName,
		})

		const newImage = await this.imageRepository.save(image)

		return newImage
	}

	/**
	 *
	 * @param imageBuffer the buffer of the image to resize
	 * @returns the resized image buffer
	 */
	private async resizeImage(imageBuffer: Buffer) {
		const buffer = await sharp(imageBuffer)
			.resize({
				width: this.MAX_SIZE_TO_RESIZE,
				height: this.MAX_SIZE_TO_RESIZE,
				fit: 'inside',
				withoutEnlargement: true,
			})
			.toFormat('jpeg')
			.jpeg({ quality: this.COMPRESSION_QUALITY })
			.toBuffer()

		return buffer
	}
}

export default new ImageService()

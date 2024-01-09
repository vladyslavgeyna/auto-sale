import sharp from 'sharp'
import { Repository } from 'typeorm'
import * as uuid from 'uuid'
import { appDataSource } from '../../data-source'
import HttpError from '../../utils/exceptions/http.error'
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

	private generateUniqueFileName() {
		return uuid.v4()
	}

	/**
	 * Save image from file
	 * @param file the file to save. Can be taken from req.file
	 * @returns the saved image
	 */
	async save(file: Express.Multer.File): Promise<Image> {
		const createdImage = await this.storingImageProcessing(file.buffer)

		return createdImage
	}

	/**
	 * Update image
	 * @param oldImageId Old image id to update
	 * @param newFile the new file to save. Can be taken from req.file
	 * @returns
	 */
	async update(oldImageId: number, newFile: Express.Multer.File) {
		const oldImage = await this.getById(oldImageId)

		if (!oldImage) {
			throw HttpError.NotFound('Image not found')
		}

		const uniqueFileName = this.generateUniqueFileName()

		const buffer = await this.resizeImage(newFile.buffer)

		const fileData: UploadFileInputDto = {
			fileName: uniqueFileName,
			fileBuffer: buffer,
			mimeType: this.IMAGE_MIME_TYPE,
		}

		await awsService.updateImage(oldImage.name, fileData)

		oldImage.name = uniqueFileName

		const updatedImage = await this.imageRepository.save(oldImage)

		return updatedImage
	}

	/**
	 * Save image from url
	 * @param url the url to save image from
	 * @returns the saved image
	 */
	async saveFromUrl(url: string) {
		const res = await fetch(url)

		const bufferArray = await res.arrayBuffer()

		const createdImage = await this.storingImageProcessing(
			Buffer.from(bufferArray),
		)

		return createdImage
	}

	/**
	 * Helper function to store image. Save image to AWS S3 and create Image entity in database
	 * @param imageBuffer the buffer of the image to store
	 * @returns the saved image
	 */
	private async storingImageProcessing(imageBuffer: Buffer) {
		const uniqueFileName = this.generateUniqueFileName()

		const buffer = await this.resizeImage(imageBuffer)

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

	/**
	 *
	 * @param id the id of the image to get
	 * @returns Image if found, otherwise null
	 */
	async getById(id: number) {
		const image = await this.imageRepository.findOneBy({ id })

		return image
	}

	/**
	 * Deletes image by name. Also deletes image from AWS S3
	 * @param imageName the name of the image to delete
	 */
	async deleteByName(imageName: string) {
		await awsService.deleteImage(imageName)

		await this.imageRepository.delete({ name: imageName })
	}
}

export default new ImageService()

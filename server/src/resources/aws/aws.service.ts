import {
	DeleteObjectCommand,
	GetObjectCommand,
	PutObjectCommand,
	S3Client,
} from '@aws-sdk/client-s3'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'
import UploadFileInputDto from './dtos/upload-file-input.dto'

class AWSService {
	private s3: S3Client
	private bucketName: string

	constructor() {
		this.s3 = new S3Client({
			credentials: {
				accessKeyId: String(process.env.AWS_ACCESS_KEY_ID),
				secretAccessKey: String(process.env.AWS_SECRET_ACCESS_KEY_ID),
			},
			region: process.env.AWS_S3_BUCKET_REGION,
		})

		this.bucketName = String(process.env.AWS_S3_BUCKET_NAME)
	}

	async uploadImage(fileData: UploadFileInputDto) {
		const command = new PutObjectCommand({
			Bucket: this.bucketName,
			Key: fileData.fileName,
			Body: fileData.fileBuffer,
			ContentType: fileData.mimeType,
		})

		await this.s3.send(command)
	}

	/**
	 *
	 * @param fileName the name of the file to get the url
	 * @returns the url of the file
	 */
	async getImageUrl(fileName: string) {
		const command = new GetObjectCommand({
			Bucket: this.bucketName,
			Key: fileName,
		})

		const imageUrl = await getSignedUrl(this.s3, command, { expiresIn: 3600 })

		return imageUrl
	}

	/**
	 *
	 * @param fileName the name of the file to delete
	 */
	async deleteImage(fileName: string) {
		const command = new DeleteObjectCommand({
			Bucket: this.bucketName,
			Key: fileName,
		})

		await this.s3.send(command)
	}
}

export default new AWSService()

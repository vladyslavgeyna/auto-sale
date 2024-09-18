import {
  DeleteObjectCommand,
  GetObjectCommand,
  PutObjectCommand,
  S3Client,
} from '@aws-sdk/client-s3';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { UploadImageDto } from './dto/upload-image.dto';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

@Injectable()
export class AwsService {
  private readonly s3: S3Client;
  private readonly bucketName: string;

  constructor(private readonly configService: ConfigService) {
    this.s3 = new S3Client({
      credentials: {
        accessKeyId: configService.getOrThrow('AWS_ACCESS_KEY_ID'),
        secretAccessKey: configService.getOrThrow('AWS_SECRET_ACCESS_KEY'),
      },
      region: configService.getOrThrow('AWS_BUCKET_REGION'),
    });

    this.bucketName = configService.getOrThrow('AWS_BUCKET_NAME');
  }

  async uploadImage(fileData: UploadImageDto) {
    const command = new PutObjectCommand({
      Bucket: this.bucketName,
      Key: fileData.fileName,
      Body: fileData.fileBuffer,
      ContentType: fileData.mimeType,
    });

    await this.s3.send(command);
  }

  async getImageUrl(fileName: string) {
    const command = new GetObjectCommand({
      Bucket: this.bucketName,
      Key: fileName,
    });

    const imageUrl = await getSignedUrl(this.s3, command, {
      expiresIn: 3600,
    });

    return imageUrl;
  }

  async deleteImage(fileName: string) {
    const command = new DeleteObjectCommand({
      Bucket: this.bucketName,
      Key: fileName,
    });

    await this.s3.send(command);
  }

  async updateImage(oldImageName: string, newFileData: UploadImageDto) {
    await this.deleteImage(oldImageName);

    await this.uploadImage(newFileData);
  }
}

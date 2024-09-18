import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Image } from './image.entity';
import { Repository } from 'typeorm';
import sharp from 'sharp';
import { getUniqueString } from 'src/common/utils/getUniqueString';
import { UploadImageDto } from 'src/aws/dto/upload-image.dto';
import { AwsService } from 'src/aws/aws.service';

@Injectable()
export class ImageService {
  private readonly IMAGE_RESIZE_THRESHOLD = 1280;
  private readonly COMPRESSION_QUALITY = 80;
  private readonly IMAGE_MIME_TYPE = 'image/jpeg';

  constructor(
    @InjectRepository(Image)
    private readonly imageRepository: Repository<Image>,
    private readonly awsService: AwsService,
  ) {}

  private async getById(id: number) {
    const image = await this.imageRepository.findOneBy({ id });

    return image;
  }

  private async resizeImage(imageBuffer: Buffer) {
    const buffer = await sharp(imageBuffer)
      .resize({
        width: this.IMAGE_RESIZE_THRESHOLD,
        height: this.IMAGE_RESIZE_THRESHOLD,
        fit: 'inside',
        withoutEnlargement: true,
      })
      .toFormat('jpeg')
      .jpeg({ quality: this.COMPRESSION_QUALITY })
      .toBuffer();

    return buffer;
  }

  private async storeImage(imageBuffer: Buffer) {
    const uniqueFileName = getUniqueString();

    const buffer = await this.resizeImage(imageBuffer);

    const fileData: UploadImageDto = {
      fileName: uniqueFileName,
      fileBuffer: buffer,
      mimeType: this.IMAGE_MIME_TYPE,
    };

    await this.awsService.uploadImage(fileData);

    const image = this.imageRepository.create({
      name: uniqueFileName,
    });

    const newImage = await this.imageRepository.save(image);

    return newImage;
  }

  async saveFromUrl(url: string) {
    const res = await fetch(url);

    const bufferArray = await res.arrayBuffer();

    const createdImage = await this.storeImage(Buffer.from(bufferArray));

    return createdImage;
  }

  async save(file: Express.Multer.File): Promise<Image> {
    const createdImage = await this.storeImage(file.buffer);

    return createdImage;
  }

  async update(imageIdToUpdate: number, newFile: Express.Multer.File) {
    const imageToUpdate = await this.getById(imageIdToUpdate);

    if (!imageToUpdate) throw new NotFoundException('Image not found');

    const uniqueFileName = getUniqueString();

    const buffer = await this.resizeImage(newFile.buffer);

    const fileData: UploadImageDto = {
      fileName: uniqueFileName,
      fileBuffer: buffer,
      mimeType: this.IMAGE_MIME_TYPE,
    };

    await this.awsService.updateImage(imageToUpdate.name, fileData);

    imageToUpdate.name = uniqueFileName;

    const updatedImage = await this.imageRepository.save(imageToUpdate);

    return updatedImage;
  }
}

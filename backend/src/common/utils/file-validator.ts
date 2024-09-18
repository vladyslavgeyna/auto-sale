import {
  FileTypeValidator,
  MaxFileSizeValidator,
  ParseFilePipe,
} from '@nestjs/common';

export const fileValidator = new ParseFilePipe({
  validators: [
    new MaxFileSizeValidator({
      maxSize: 1024 * 1024 * 5,
      message: 'Max image size is 5 MB',
    }),
    new FileTypeValidator({
      fileType: /^(image\/png|image\/jpeg|image\/jpg)$/,
    }),
  ],
});

import {
  Body,
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { AccountService } from './account.service';
import { RegisterInputDto } from './dto/register-input.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { File } from 'src/common/types';
import { fileValidator } from 'src/common/utils/file-validator';
import { SerializeInput } from 'src/common/decorators/serialize-input.decorator';
import { SerializeOutput } from 'src/common/decorators/serialize-output.decorator';
import { RegisterOutputDto } from './dto/register-output.dto';

@Controller('account')
export class AccountController {
  constructor(private readonly accountService: AccountService) {}

  @Post('register')
  @SerializeInput(RegisterInputDto)
  @SerializeOutput(RegisterOutputDto)
  @UseInterceptors(FileInterceptor('image'))
  async register(
    @Body() registerDto: RegisterInputDto,
    @UploadedFile(fileValidator) image?: File,
  ) {
    const registeredUser = await this.accountService.register(
      registerDto,
      image,
    );

    return registeredUser;
  }
}

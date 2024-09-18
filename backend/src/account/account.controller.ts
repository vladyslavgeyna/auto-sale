import {
  Body,
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { AccountService } from './account.service';
import { RegisterDto } from './dto/register.dto';
import { Serialize } from 'src/common/decorators/serialize.decorator';
import { FileInterceptor } from '@nestjs/platform-express';
import { File } from 'src/common/types';
import { fileValidator } from 'src/common/utils/file-validator';

@Controller('account')
export class AccountController {
  constructor(private readonly accountService: AccountService) {}

  @Post('register')
  @Serialize(RegisterDto)
  @UseInterceptors(FileInterceptor('image'))
  async register(
    @Body() registerDto: RegisterDto,
    @UploadedFile(fileValidator) image: File,
  ) {
    console.log('image', image);
    const registeredUser = await this.accountService.register(registerDto);

    return registeredUser;
  }
}

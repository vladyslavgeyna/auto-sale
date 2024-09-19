import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Request,
  UploadedFile,
  UseGuards,
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
import { LocalAuthGuard } from './guards/local-auth/local-auth.guard';

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

  @Post('login')
  @HttpCode(HttpStatus.OK)
  @UseGuards(LocalAuthGuard)
  async login(@Request() request) {
    const userData = await this.accountService.login(request.user);

    return userData;
  }
}

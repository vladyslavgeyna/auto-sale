import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Request,
  Response,
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
import { RefreshAuthGuard } from './guards/refresh-auth/refresh-auth.guard';
import { SetRefreshTokenCookieInterceptor } from './interceptors/set-refresh-token-cookie.interceptor';
import { JwtAuthGuard } from './guards/jwt-auth/jwt-auth.guard';
import { REFRESH_TOKEN_COOKIE } from 'src/common/constants';

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
  @UseInterceptors(SetRefreshTokenCookieInterceptor)
  async login(@Request() request) {
    const userData = await this.accountService.login(request.user);

    return userData;
  }

  @Post('refresh')
  @UseGuards(RefreshAuthGuard)
  @UseInterceptors(SetRefreshTokenCookieInterceptor)
  async refreshTokens(@Request() request) {
    const userData = await this.accountService.login(request.user);

    return userData;
  }

  @Post('logout')
  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtAuthGuard)
  async logout(@Request() request, @Response({ passthrough: true }) response) {
    await this.accountService.logout(request.user.id);

    response.clearCookie(REFRESH_TOKEN_COOKIE);
  }
}

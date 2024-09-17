import {
  Body,
  Controller,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AccountService } from './account.service';
import { RegisterDto } from './dto/register.dto';

@Controller('account')
export class AccountController {
  constructor(private readonly authService: AccountService) {}

  @Post('register')
  @UsePipes(new ValidationPipe())
  register(@Body() registerDto: RegisterDto) {
    console.log(registerDto);
    return 'Register';
  }
}

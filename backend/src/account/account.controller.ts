import { Body, Controller, Post } from '@nestjs/common';
import { AccountService } from './account.service';
import { RegisterDto } from './dto/register.dto';
import { Serialize } from 'src/common/decorators/serialize.decorator';

@Controller('account')
export class AccountController {
  constructor(private readonly accountService: AccountService) {}

  @Post('register')
  @Serialize(RegisterDto)
  async register(@Body() registerDto: RegisterDto) {
    console.log('CONTROLLER register');
    const registeredUser = await this.accountService.register(registerDto);

    return registeredUser;
  }
}

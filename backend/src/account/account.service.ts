import { BadRequestException, Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { RegisterDto } from './dto/register.dto';
import { getHashedString } from 'src/common/utils/getHashedString';

@Injectable()
export class AccountService {
  constructor(private readonly userService: UserService) {}

  async register(registerDto: RegisterDto) {
    const { email, phone, password } = registerDto;
    console.log('registerDto', registerDto);

    const candidate = await this.userService.getByEmail(email);

    if (candidate)
      throw new BadRequestException(`User with ${email} email already exists`);

    if (phone) {
      const candidateByPhone = await this.userService.getByPhone(phone);

      if (candidateByPhone)
        throw new BadRequestException(
          `User with ${phone} phone already exists`,
        );
    }

    const hashedPassword = await getHashedString(password);

    const user = await this.userService.create({
      ...registerDto,
      password: hashedPassword,
    });

    return user;
  }
}

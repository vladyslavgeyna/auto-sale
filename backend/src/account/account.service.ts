import { BadRequestException, Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { RegisterDto } from './dto/register.dto';
import { getHashedString } from 'src/common/utils/getHashedString';
import { File } from 'src/common/types';
import { ImageService } from 'src/image/image.service';
import { ConfigService } from '@nestjs/config';
import { EmailService } from 'src/email/email.service';

@Injectable()
export class AccountService {
  constructor(
    private readonly userService: UserService,
    private readonly imageService: ImageService,
    private readonly configService: ConfigService,
    private readonly emailService: EmailService,
  ) {}

  async register(registerDto: RegisterDto, image?: File) {
    const { email, phone, password } = registerDto;

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

    const createdImage = image ? await this.imageService.save(image) : null;

    const hashedPassword = await getHashedString(password);

    const user = await this.userService.create({
      ...registerDto,
      password: hashedPassword,
      image: createdImage,
    });

    const apiUrl = this.configService.get('API_URL');

    const verificationLink = `${apiUrl}/api/account/verify/${user.id}`;

    const emailHtml = await this.emailService.readEmailTemplate(
      'account-verification',
    );

    await this.emailService.sendHtmlEmail({
      to: user.email,
      subject: `Email verification on ${apiUrl}`,
      html: emailHtml.replace('${VERIFICATION_LINK}', verificationLink),
    });

    return user;
  }
}

import {
  BadRequestException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { RegisterInputDto } from './dto/register-input.dto';
import { getHashedString } from 'src/common/utils/getHashedString';
import { File } from 'src/common/types';
import { ImageService } from 'src/image/image.service';
import { ConfigService } from '@nestjs/config';
import { EmailService } from 'src/email/email.service';
import { AwsService } from 'src/aws/aws.service';
import { LoginInputDto } from './dto/login-input.dto';
import { compare } from 'bcrypt';
import { RequestUser } from './types/request-user';
import { TokenService } from 'src/token/token.service';

@Injectable()
export class AccountService {
  constructor(
    private readonly userService: UserService,
    private readonly imageService: ImageService,
    private readonly configService: ConfigService,
    private readonly emailService: EmailService,
    private readonly awsService: AwsService,
    private readonly tokenService: TokenService,
  ) {}

  async register(registerDto: RegisterInputDto, image?: File) {
    const { email, phone, password } = registerDto;

    const candidate = await this.userService.getByEmail(email, {
      relations: {
        image: true,
      },
    });

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
    const clientUrl = this.configService.get('CLIENT_URL');

    const verificationLink = `${apiUrl}/api/account/verify/${user.id}`;

    const emailHtml = await this.emailService.readEmailTemplate(
      'account-verification',
    );

    await this.emailService.sendHtmlEmail({
      to: user.email,
      subject: `Email verification on ${clientUrl}`,
      html: emailHtml.replace('${VERIFICATION_LINK}', verificationLink),
    });

    const imageLink = createdImage
      ? await this.awsService.getImageUrl(createdImage.name)
      : null;

    return { ...user, imageLink };
  }

  async validateUser(registerDto: LoginInputDto): Promise<RequestUser> {
    const { email, password } = registerDto;

    const candidate = await this.userService.getByEmail(email);

    if (!candidate)
      throw new BadRequestException(`User with email ${email} was not found`);

    if (!candidate.isVerified)
      throw new ForbiddenException(
        `User is not verified. Please, verify ${email} email address by following the link in received email`,
      );

    const isPasswordCorrect = await compare(password, candidate.password);

    if (!isPasswordCorrect)
      throw new BadRequestException('Password is incorrect');

    const imageName = candidate.image?.name;

    const imageLink = imageName
      ? await this.awsService.getImageUrl(imageName)
      : null;

    return new RequestUser(candidate, imageLink);
  }

  async login(user: RequestUser) {
    const tokens = await this.tokenService.generateTokens(user);

    const hashedRefreshToken = await getHashedString(tokens.refreshToken);

    await this.userService.updateRefreshToken(user.id, hashedRefreshToken);

    return { ...tokens, ...user };
  }

  async logout(userId: string) {
    await this.userService.updateRefreshToken(userId, null);
  }
}

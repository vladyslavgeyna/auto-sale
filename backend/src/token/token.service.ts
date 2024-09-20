import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcrypt';
import { AuthJwtPayload } from 'src/account/types/auth-jwt-payload';
import { RequestUser } from 'src/account/types/request-user';
import { AwsService } from 'src/aws/aws.service';
import { UserService } from 'src/user/user.service';

@Injectable()
export class TokenService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly userService: UserService,
    private readonly awsService: AwsService,
  ) {}

  async generateTokens(user: RequestUser) {
    const tokenPayload: AuthJwtPayload = { sub: user };

    const accessToken = await this.jwtService.signAsync(tokenPayload);

    const refreshToken = await this.jwtService.signAsync(tokenPayload, {
      secret: this.configService.get('JWT_REFRESH_SECRET'),
      expiresIn: '7d',
    });

    return { accessToken, refreshToken };
  }

  async validateRefreshToken(
    userId: string,
    refreshToken: string,
  ): Promise<RequestUser> {
    const user = await this.userService.getById(userId, {
      relations: {
        image: true,
      },
    });

    if (!user || !user.refreshToken) throw new UnauthorizedException();

    const isRefreshTokenValid = await compare(refreshToken, user.refreshToken);

    if (!isRefreshTokenValid) throw new UnauthorizedException();

    const imageName = user.image?.name;

    const imageLink = imageName
      ? await this.awsService.getImageUrl(imageName)
      : null;

    return new RequestUser(user, imageLink);
  }
}

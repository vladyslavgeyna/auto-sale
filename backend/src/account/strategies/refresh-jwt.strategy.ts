import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-jwt';
import { AuthJwtPayload } from '../types/auth-jwt-payload';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Request } from 'express';
import { UserService } from 'src/user/user.service';
import { RequestUser } from '../types/request-user';
import { AwsService } from 'src/aws/aws.service';

@Injectable()
export class RefreshJwtStrategy extends PassportStrategy(
  Strategy,
  'refresh-jwt',
) {
  constructor(
    private readonly configService: ConfigService,
    private readonly userService: UserService,
    private readonly awsService: AwsService,
  ) {
    super({
      jwtFromRequest: (req: Request) => {
        const { refreshToken } = req.cookies;

        return refreshToken || null;
      },
      secretOrKey: configService.get('JWT_REFRESH_SECRET'),
      ignoreExpiration: false,
    });
  }

  async validate({ sub }: AuthJwtPayload): Promise<RequestUser> {
    const { id: userId } = sub;

    //Find user by id in database to get and store fresh user data
    const user = await this.userService.getById(userId, {
      relations: {
        image: true,
      },
    });

    if (!user) throw new UnauthorizedException();

    const imageName = user.image?.name;

    const imageLink = imageName
      ? await this.awsService.getImageUrl(imageName)
      : null;

    return new RequestUser(user, imageLink);
  }
}

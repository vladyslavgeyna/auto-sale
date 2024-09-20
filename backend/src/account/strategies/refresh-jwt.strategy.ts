import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-jwt';
import { AuthJwtPayload } from '../types/auth-jwt-payload';
import { Injectable } from '@nestjs/common';
import { Request } from 'express';
import { RequestUser } from '../types/request-user';
import { TokenService } from 'src/token/token.service';

@Injectable()
export class RefreshJwtStrategy extends PassportStrategy(
  Strategy,
  'refresh-jwt',
) {
  constructor(
    private readonly configService: ConfigService,
    private readonly tokenService: TokenService,
  ) {
    super({
      jwtFromRequest: (req: Request) => {
        const { refreshToken } = req.cookies;

        return refreshToken || null;
      },
      secretOrKey: configService.get('JWT_REFRESH_SECRET'),
      ignoreExpiration: false,
      passReqToCallback: true,
    });
  }

  async validate(
    request: Request,
    { sub }: AuthJwtPayload,
  ): Promise<RequestUser> {
    const { id: userId } = sub;
    const { refreshToken } = request.cookies;

    // Validate and find user by id in database to get and store fresh user data
    const user = await this.tokenService.validateRefreshToken(
      userId,
      refreshToken,
    );

    return user;
  }
}

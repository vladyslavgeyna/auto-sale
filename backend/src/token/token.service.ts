import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { AuthJwtPayload } from 'src/account/types/auth-jwt-payload';
import { RequestUser } from 'src/account/types/request-user';

@Injectable()
export class TokenService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  generateTokens(user: RequestUser) {
    const tokenPayload: AuthJwtPayload = { sub: user };

    const accessToken = this.jwtService.sign(tokenPayload);

    const refreshToken = this.jwtService.sign(tokenPayload, {
      secret: this.configService.get('JWT_REFRESH_SECRET'),
      expiresIn: '7d',
    });

    return { accessToken, refreshToken };
  }
}

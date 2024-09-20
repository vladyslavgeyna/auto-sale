import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { REFRESH_TOKEN_COOKIE } from 'src/common/constants';

@Injectable()
export class SetRefreshTokenCookieInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((data) => {
        const response = context.switchToHttp().getResponse();

        const { refreshToken, ...responseData } = data;

        response.cookie(REFRESH_TOKEN_COOKIE, refreshToken, {
          httpOnly: true,
          maxAge: 7 * 24 * 60 * 60 * 1000,
        });

        return responseData;
      }),
    );
  }
}

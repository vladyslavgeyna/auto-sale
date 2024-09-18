import {
  applyDecorators,
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
  UseInterceptors,
} from '@nestjs/common';
import { ClassConstructor, plainToInstance } from 'class-transformer';
import { Observable } from 'rxjs';

@Injectable()
class SerializeInputInterceptor<T> implements NestInterceptor {
  constructor(private readonly dto: ClassConstructor<T>) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<T> {
    const request = context.switchToHttp().getRequest();

    if (request.body)
      request.body = plainToInstance(this.dto, request.body, {
        excludeExtraneousValues: true,
        enableImplicitConversion: true,
      });

    return next.handle();
  }
}

export const SerializeInput = <T>(dto: ClassConstructor<T>) =>
  applyDecorators(UseInterceptors(new SerializeInputInterceptor(dto)));

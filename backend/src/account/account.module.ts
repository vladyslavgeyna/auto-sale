import { Module } from '@nestjs/common';
import { AccountController } from './account.controller';
import { AccountService } from './account.service';
import { UserModule } from 'src/user/user.module';
import { ImageModule } from 'src/image/image.module';
import { EmailModule } from 'src/email/email.module';
import { AwsModule } from 'src/aws/aws.module';
import { LocalStrategy } from './strategies/local.strategy';
import { JwtStrategy } from './strategies/jwt.strategy';
import { RefreshJwtStrategy } from './strategies/refresh-jwt.strategy';
import { TokenModule } from 'src/token/token.module';

@Module({
  controllers: [AccountController],
  providers: [AccountService, LocalStrategy, JwtStrategy, RefreshJwtStrategy],
  imports: [UserModule, ImageModule, EmailModule, AwsModule, TokenModule],
})
export class AccountModule {}

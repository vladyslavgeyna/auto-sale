import { Module } from '@nestjs/common';
import { AccountController } from './account.controller';
import { AccountService } from './account.service';
import { UserModule } from 'src/user/user.module';
import { ImageModule } from 'src/image/image.module';
import { EmailModule } from 'src/email/email.module';
import { AwsModule } from 'src/aws/aws.module';
import { LocalStrategy } from './strategies/local.strategy';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { JwtStrategy } from './strategies/jwt.strategy';

@Module({
  controllers: [AccountController],
  providers: [AccountService, LocalStrategy, JwtStrategy],
  imports: [
    UserModule,
    ImageModule,
    EmailModule,
    AwsModule,
    JwtModule.registerAsync({
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get('JWT_ACCESS_SECRET'),
        signOptions: { expiresIn: '1d' },
      }),
      inject: [ConfigService],
    }),
  ],
})
export class AccountModule {}

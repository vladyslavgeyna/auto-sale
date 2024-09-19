import { Module } from '@nestjs/common';
import { AccountModule } from './account/account.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { AwsModule } from './aws/aws.module';
import { ImageModule } from './image/image.module';
import { EmailModule } from './email/email.module';
import { TokenService } from './token/token.service';
import { TokenModule } from './token/token.module';

@Module({
  imports: [
    AccountModule,
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('POSTGRES_HOST'),
        port: configService.get('POSTGRES_PORT'),
        username: configService.get('POSTGRES_USER'),
        password: configService.get('POSTGRES_PASSWORD'),
        database: configService.get('POSTGRES_DB'),
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
        synchronize: true,
      }),
    }),
    UserModule,
    AwsModule,
    ImageModule,
    EmailModule,
    TokenModule,
  ],
  controllers: [],
  providers: [TokenService],
})
export class AppModule {}

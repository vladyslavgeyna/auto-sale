import { Module } from '@nestjs/common';
import { AccountController } from './account.controller';
import { AccountService } from './account.service';
import { UserModule } from 'src/user/user.module';
import { ImageModule } from 'src/image/image.module';
import { EmailModule } from 'src/email/email.module';

@Module({
  controllers: [AccountController],
  providers: [AccountService],
  imports: [UserModule, ImageModule, EmailModule],
})
export class AccountModule {}

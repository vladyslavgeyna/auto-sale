import { Module } from '@nestjs/common';
import { AccountController } from './account.controller';
import { AccountService } from './account.service';
import { UserModule } from 'src/user/user.module';

@Module({
  controllers: [AccountController],
  providers: [AccountService],
  imports: [UserModule],
})
export class AccountModule {}

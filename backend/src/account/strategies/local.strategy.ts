import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AccountService } from '../account.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly accountService: AccountService) {
    super({
      usernameField: 'email',
    });
  }

  async validate(email: string, password: string) {
    const user = await this.accountService.validateUser({ email, password });

    return user;
  }
}

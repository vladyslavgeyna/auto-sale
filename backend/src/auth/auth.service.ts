import { Injectable } from '@nestjs/common';
import { LoginPayloadDto } from './dto/login.dto';

const users = [
  {
    id: 1,
    username: 'admin',
    password: 'admin',
  },
  {
    id: 2,
    username: 'user',
    password: 'user',
  },
];

@Injectable()
export class AuthService {
  validateUser(loginPayload: LoginPayloadDto) {}
}

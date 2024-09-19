import { IsEmail, IsString } from 'class-validator';

export class LoginInputDto {
  @IsEmail()
  email: string;

  @IsString()
  password: string;
}

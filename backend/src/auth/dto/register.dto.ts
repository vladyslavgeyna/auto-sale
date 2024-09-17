import {
  IsEmail,
  IsOptional,
  IsString,
  Length,
  IsStrongPassword,
  Matches,
  ValidateIf,
} from 'class-validator';
import { PHONE_REGEX } from 'src/common/constants';

export class RegisterDto {
  @IsString()
  @IsEmail()
  email: string;

  @IsString()
  @Length(2, 50)
  name: string;

  @IsString()
  @Length(2, 50)
  surname: string;

  @IsString()
  @IsStrongPassword({
    minLength: 6,
    minLowercase: 1,
    minUppercase: 1,
    minNumbers: 1,
    minSymbols: 1,
  })
  password: string;

  @IsString()
  @ValidateIf((o) => o.password !== o.repeatPassword, {
    message: 'Passwords do not match',
  })
  passwordConfirm: string;

  @IsOptional()
  @IsString()
  @Matches(PHONE_REGEX)
  phone?: string;
}

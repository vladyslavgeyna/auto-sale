import {
  IsEmail,
  IsOptional,
  Length,
  IsStrongPassword,
  Matches,
} from 'class-validator';
import { PHONE_REGEX } from 'src/common/constants';
import { Match } from 'src/common/decorators/match.decorator';

export class RegisterDto {
  @IsEmail()
  email: string;

  @Length(2, 50)
  name: string;

  @Length(2, 50)
  surname: string;

  @IsStrongPassword({
    minLength: 6,
    minLowercase: 1,
    minUppercase: 1,
    minNumbers: 1,
    minSymbols: 1,
  })
  password: string;

  @Match('password', { message: 'Passwords do not match' })
  passwordConfirm: string;

  @IsOptional()
  @Matches(PHONE_REGEX)
  phone?: string;
}

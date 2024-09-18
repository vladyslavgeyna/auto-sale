import { Expose } from 'class-transformer';
import {
  IsEmail,
  IsOptional,
  Length,
  IsStrongPassword,
  Matches,
} from 'class-validator';
import { PHONE_REGEX } from 'src/common/constants';
import { Match } from 'src/common/decorators/match.decorator';

export class RegisterInputDto {
  @IsEmail()
  @Expose()
  email: string;

  @Length(2, 50)
  @Expose()
  name: string;

  @Length(2, 50)
  @Expose()
  surname: string;

  @IsStrongPassword({
    minLength: 6,
    minLowercase: 1,
    minUppercase: 1,
    minNumbers: 1,
    minSymbols: 1,
  })
  @Expose()
  password: string;

  @Match('password', { message: 'Passwords do not match' })
  @Expose()
  passwordConfirm: string;

  @IsOptional()
  @Matches(PHONE_REGEX)
  @Expose()
  phone?: string;
}

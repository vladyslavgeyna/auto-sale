import { Image } from 'src/image/image.entity';

export class CreateUserDto {
  email: string;
  name: string;
  surname: string;
  password: string;
  passwordConfirm: string;
  phone?: string;
  image: Image | null;
}

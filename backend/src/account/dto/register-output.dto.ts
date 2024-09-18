import { Expose } from 'class-transformer';

export class RegisterOutputDto {
  @Expose()
  id: string;

  @Expose()
  email: string;

  @Expose()
  name: string;

  @Expose()
  surname: string;

  @Expose()
  phone: string | null;

  @Expose()
  imageLink: string | null;
}

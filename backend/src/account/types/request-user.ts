import { User } from 'src/user/user.entity';

export class RequestUser {
  id: string;
  email: string;
  name: string;
  surname: string;
  phone: string | null;
  imageLink: string | null;

  constructor(user: User, imageLink: string | null) {
    this.id = user.id;
    this.email = user.email;
    this.name = user.name;
    this.surname = user.surname;
    this.phone = user.phone;
    this.imageLink = imageLink;
  }
}

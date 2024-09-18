import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async getByEmail(email: string): Promise<User | null> {
    const user = await this.userRepository.findOneBy({
      email,
    });

    return user;
  }

  async getByPhone(phone: string): Promise<User | null> {
    const user = await this.userRepository.findOneBy({
      phone,
    });

    return user;
  }

  async create(user: CreateUserDto) {
    const newUser = this.userRepository.create(user);

    const createdUser = await this.userRepository.save(newUser);

    return createdUser;
  }
}

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { FindOneOptions, Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async getByEmail(
    email: string,
    options?: FindOneOptions<User>,
  ): Promise<User | null> {
    const user = await this.userRepository.findOne({
      ...options,
      where: { email },
    });

    return user;
  }

  async getById(
    id: string,
    options?: FindOneOptions<User>,
  ): Promise<User | null> {
    const user = await this.userRepository.findOne({
      ...options,
      where: { id },
    });

    return user;
  }

  async getByPhone(
    phone: string,
    options?: FindOneOptions<User>,
  ): Promise<User | null> {
    const user = await this.userRepository.findOne({
      ...options,
      where: { phone },
    });

    return user;
  }

  async create(user: CreateUserDto) {
    const newUser = this.userRepository.create(user);

    const createdUser = await this.userRepository.save(newUser);

    return createdUser;
  }

  async updateRefreshToken(userId: string, refreshToken: string | null) {
    return await this.userRepository.update({ id: userId }, { refreshToken });
  }
}

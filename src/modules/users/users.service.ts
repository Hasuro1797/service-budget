import {
  Injectable,
  NotFoundException,
  HttpStatus,
  HttpException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto, UpdateUserDto } from './dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async createUser(user: CreateUserDto): Promise<User> {
    const userFound = await this.userRepository.findOne({
      where: { email: user.email },
    });
    if (userFound)
      throw new HttpException('Email already exists.', HttpStatus.CONFLICT);
    const newUser = this.userRepository.create(user);
    return await this.userRepository.save(newUser);
  }

  async getUser(id: number): Promise<User> {
    const userFound = await this.userRepository.findOne({
      where: {
        id,
      },
    });
    if (!userFound) throw new NotFoundException('User not found');
    return userFound;
  }

  async getUsers(): Promise<User[]> {
    return await this.userRepository.find();
  }

  async updatedUser(id: number, user: UpdateUserDto) {
    const userFound = await this.getUser(id);
    if (!userFound) throw new NotFoundException('User not found.');
    return await this.userRepository.update({ id }, user);
  }

  async deleteUser(id: number) {
    const result = await this.userRepository.delete({ id });
    if (result.affected === 0) throw new NotFoundException('User not found.');
  }
}

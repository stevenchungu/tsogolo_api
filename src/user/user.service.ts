import { Injectable, NotFoundException  } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Equal } from 'typeorm';
import { User } from './user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}
  async createUser(name: string, email: string, password: string): Promise<User> {
    const user = new User();
    user.name = name;
    user.email = email;
    user.password = await bcrypt.hash(password, 10); // Hash the password using bcrypt
    return this.usersRepository.save(user);
  }

  async findUserByEmail(email: string): Promise<User | undefined> {
    return this.usersRepository.findOne({ where: { email: Equal(email) } });
  } 
  
  
  async deleteUser(id: number) {
    const user = await this.usersRepository.findOne({ where: { id: id } });
    if (!user) {
      throw new NotFoundException('User not found');
    }

    await this.usersRepository.remove(user);
  }
  
}


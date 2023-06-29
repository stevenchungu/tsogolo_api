// user.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { UserDTO } from './dto/user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async register(userDTO: UserDTO): Promise<void> {
    const { email, password, name } = userDTO;
    const newUser = this.userRepository.create({ email, password, name });
    await this.userRepository.save(newUser);
    console.log('User registered:', newUser);
  }

  async login(email: string, password: string): Promise<User | null> {
    const user = await this.userRepository.findOne({where: {email}});

    if (user && user.password === password) {
      return user;
    }
    
    return null;
  }

  async getAllUsers(): Promise<User[]> {
    return await this.userRepository.find();
  }

  async updateUser(id: number, userDTO: UserDTO): Promise<UserDTO> {
    await this.userRepository.update(id, userDTO);
    const updatedUser = await this.userRepository.findOne({where: {id}});
    return updatedUser;
  }
async deleteUser(id:number) : Promise<void> {
  await this.userRepository.delete(id)
}
}

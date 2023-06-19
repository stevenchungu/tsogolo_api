// user.controller.ts
import { Body, Controller, Get, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { UserDTO } from './dto/user.dto';
import { User } from './entities/user.entity';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('register')
  async register(@Body() userDTO: UserDTO): Promise<void> {
    await this.userService.register(userDTO);
  }
  @Post('login')
  async login(@Body() userDTO: UserDTO): Promise<UserDTO | null> {
    const { email, password } = userDTO;
    return await this.userService.login(email, password);
  }
   @Get()
  async getAllUsers(): Promise<User[]> {
    return await this.userService.getAllUsers();
  }
}

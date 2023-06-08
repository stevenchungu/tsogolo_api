import { Controller, Post, Body, Delete, Param } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { User } from './user.entity';
import { UsersService } from './user.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  @Post('register')
  async register(
    @Body('name') name: string,
    @Body('email') email: string,
    @Body('password') password: string,
  ): Promise<User> {
    const hashedPassword = await bcrypt.hash(password, 10); // Hash the password using bcrypt
    const user = await this.usersService.createUser(name, email, hashedPassword);
    return user;
  }
  
  @Post('login')
  async login(
    @Body('email') email: string,
    @Body('password') password: string,
  ): Promise<User | undefined> {
    const user = await this.usersService.findUserByEmail(email);
    if (user && bcrypt.compareSync(password, user.password)) {
      return user;
    }
    return undefined;
  }

  @Delete(':id')
  deleteUser(@Param('id') id: number) {
    return this.usersService.deleteUser(id);
  }
}

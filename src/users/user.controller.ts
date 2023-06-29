// user.controller.ts
import { Body, Controller, Delete, Get, Param, Patch, Post, Put } from '@nestjs/common';
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

  @Patch(':id') 
  async  updateUser(@Param('id') id:number, @Body() userDto : UserDTO) : Promise<UserDTO>{
    return await this.userService.updateUser(id, userDto)
  }
@Delete(':id')
async deleteUser(@Param('id') id: number) : Promise<void>{
  return await this.userService.deleteUser(id);
}
}
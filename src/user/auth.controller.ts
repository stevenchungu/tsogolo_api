// import { Controller, Post, Body } from '@nestjs/common';
// import { AuthService } from './auth.service';

// @Controller('auth')
// export class AuthController {
//   constructor(private readonly authService: AuthService) {}

//   @Post('login')
//   async login(@Body() credentials: { email: string; password: string }) {
//     const token = await this.authService.login(credentials.email, credentials.password);
//     return { token };
//   }

//   @Post('signup')
//   async signup(@Body() user: { email: string; password: string }) {
//     await this.authService.signup(user.email, user.password);
//     return { message: 'User created successfully' };
//   }
// }

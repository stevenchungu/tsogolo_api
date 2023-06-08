// import { Injectable, UnauthorizedException } from '@nestjs/common';
// import { UserService } from '../user/user.service';
// import { JwtService } from '@nestjs/jwt';
// import * as bcrypt from 'bcrypt';
// import { User } from '../user/user.entity';

// @Injectable()
// export class AuthService {
//   constructor(private readonly userService: UserService, private readonly jwtService: JwtService) {}

//   async login(email: string, password: string): Promise<string> {
//     const user = await this.userService.findByEmail(email);
//     if (!user || !(await bcrypt.compare(password, user.password))) {
//       throw new UnauthorizedException('Invalid credentials');
//     }
//     const payload = { email: user.email, sub: user.id };
//     return this.jwtService.sign(payload);
//   }

//   async signup(email: string, password: string, name: string): Promise<void> {
//     const hashedPassword = await bcrypt.hash(password, 10);
//     const user: User = { email, password: hashedPassword, name };
//     await this.userService.create(user);
//   }
// }

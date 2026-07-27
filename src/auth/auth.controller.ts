import { Body, Controller, Get, Post } from '@nestjs/common';
import { LoginDto } from './dtos/login.dto';
import { AuthService } from './auth.service';


@Controller('api/auth')
export class AuthController {

  constructor(
    private readonly authService: AuthService) { }


  @Get()
  test(): any {
    return "test";
  }

  // auth.controller.ts
  @Post('login')
  async login(@Body() credentials: LoginDto) {
    const user = await this.authService.validateUser(credentials.user, credentials.password);
    return this.authService.generateJWT(user);
  }



}

import { Body, Controller, Get, Post, Req } from '@nestjs/common';
import { LoginDto } from './dtos/login.dto';
import { AuthService } from './auth.service';


@Controller('api/auth')
export class AuthController {

  constructor(
    private readonly authService: AuthService) { }


  @Get()
  test(@Req() req: Request): any {
    return req.body;
  }

  // auth.controller.ts
  @Post('login')
  async login(@Body() credentials: LoginDto, // Extrae solo el body
              @Req() req: Request) {
    const user = await this.authService.validateUser(credentials.user, credentials.password);
    return this.authService.generateJWT(user);
  }



}

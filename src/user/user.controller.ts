import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { UserDto } from './dtos/user.dto';
import { JwtAuthGuard } from 'src/common/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('api/user')
export class UserController {

  constructor(
    private readonly userService: UserService) {}

  @Get()
  findAll(@Req() req: Request): any { 
    console.log("req", req, req.body)
    const usuarioLogueado = req['user'];
    console.log("usuarioLogueado", usuarioLogueado) 
    return this.userService.findAll();
  }

  @Post()
  save(@Body() newUser: UserDto): any {
    return this.userService.save(newUser);
  }

  @Get('findById/:userId')
  findById( userId: number): any {
    return this.userService.findById(userId);
  }

}

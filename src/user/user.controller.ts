import { Body, Controller, Get, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { UserDto } from './dtos/user.dto';

@Controller('api/user')
export class UserController {

  constructor(
    private readonly userService: UserService) {}

  @Get()
  findAll(): any {
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

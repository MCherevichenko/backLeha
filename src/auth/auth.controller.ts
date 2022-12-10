import {
  Controller,
  Post,
  Body,
  Req
} from '@nestjs/common';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { AuthService } from './auth.service';


@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService,) {}

  @Post('register')
  create(@Body() createAuthDto: CreateUserDto, @Req() req) {
    return this.authService.registration(createAuthDto);
  }
  
  @Post('login')
  login(@Body() body: CreateUserDto){
    return this.authService.login(body);
  }
}

import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { AuthHelper } from './auth.helper';
import { UserService } from '../user/user.service';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { User } from '../user/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private authHelper: AuthHelper,
    private readonly userService: UserService,
  ) {}
  
  async registration(user: CreateUserDto){
    const checkUser = await this.userService.findOneByEmail(user.email);
    if(checkUser?.email === user.email) {
      throw new HttpException('Пользователь с таким email уже существует', HttpStatus.CONFLICT);
    }
    const newUser = new User();
    newUser.email = user.email;
    newUser.password = await this.authHelper.encodePassword(user.password);
    const us = await this.userService.create(newUser);
    return {
      accessToken: this.authHelper.generateToken(newUser.userId),
      checkUser: us,
    }
  }

  async login(user: CreateUserDto) {
    const checkUser = await this.userService.findOneByEmail(user.email);
    if(!checkUser) {
      throw new HttpException(
        'Неправильный email или пароль',
        HttpStatus.UNAUTHORIZED,
      );
    }
    
    const isPasswordValid = await this.authHelper.isPasswordValid(
      user.password,
      checkUser.password
    )
    
    if (!isPasswordValid) {
      throw new HttpException(
        'Неправильный email или пароль',
        HttpStatus.UNAUTHORIZED,
      );
    }
    
    return {
      accessToken: this.authHelper.generateToken(checkUser.userId),
      checkUser,
    };
  }
}

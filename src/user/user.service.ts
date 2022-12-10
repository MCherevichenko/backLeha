import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  findOneByEmail(email: string) {
    return this.userRepository.findOne({ where: { email }})
  }
  
  findOneById(userId: string) {
    return this.userRepository.findOne({ where: { userId } })
  }
  
  create(user: User) {
    return this.userRepository.save(user);
  }
}
